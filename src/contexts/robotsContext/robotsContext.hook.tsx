import { ResourceType, ResultStatus, RobotsResourceType } from 'contexts/robotsContext/robotContext'
import { hasFoobarSucceeded } from 'contexts/robotsContext/robotContext.utils'
import {
  defaultRobotsResources,
  defaultStatus,
  initialRobotContext,
} from 'contexts/robotsContext/robotsContext.variables'
import { ContextType, createContext, ReactNode, useContext } from 'react'
import React, { useState } from 'react'
import { Status } from 'utils/common.enum'
import { requirement } from 'utils/settings'

export const RobotsContext = createContext<RobotsResourceType>(initialRobotContext)

export const useRobotsContext = (): ContextType<any> & RobotsResourceType =>
  useContext(RobotsContext)

export const RobotsContextProvider: React.FC<{ children: ReactNode } & Partial<ResourceType>> = ({
  children,
  foo = defaultRobotsResources.foo,
  bar = defaultRobotsResources.bar,
  foobar = defaultRobotsResources.foobar,
  robot = defaultRobotsResources.robot,
}) => {
  const [fooState, setFoo] = useState(foo)
  const [barState, setBar] = useState(bar)
  const [foobarState, setFoobar] = useState(foobar)
  const [robotState, setRobot] = useState(robot)
  const [resultStatus, setResultStatus] = useState<ResultStatus>(defaultStatus)

  // Function that adds a Foo to global context
  const incrementFoo = () => {
    setFoo((fooState) => fooState + 1)
    // Result is always success
    setResultStatus((status) => ({ ...status, foo: Status.success }))
  }

  // Function that add a Bar to global context
  const incrementBar = () => {
    setBar((barState) => barState + 1)
    // Result is always success
    setResultStatus((status) => ({ ...status, bar: Status.success }))
  }

  // Function that adds a Robot to global context if there is enough Foo and Foobar
  // Do nothing if there is not enough resources
  const buyRobot = () => {
    const { foo: fooRequired, foobar: foobarRequired } = requirement.robot

    const hasEnoughResources = fooState >= fooRequired && foobarState >= foobarRequired

    if (hasEnoughResources) {
      setFoo((fooState) => fooState - fooRequired)
      setFoobar((foobarState) => foobarState - foobarRequired)
      setRobot((robotState) => robotState + 1)
      // Result is always success
      setResultStatus((status) => ({ ...status, robot: Status.success }))
    }
  }

  // Function that tries to add a Foobar to global context
  // It has 60% chances to succeed and 40% chances to fail
  // Do nothing if there is not enough resources
  const buildFoobar = () => {
    const { foo: fooRequired, bar: barRequired } = requirement.foobar
    const hasEnoughResources = fooState >= fooRequired && barState >= barRequired
    if (hasEnoughResources) {
      const hasSucceeded = hasFoobarSucceeded()
      // Set result depending on the value returned by hasFoobarSucceeded utils
      setResultStatus((status) => ({ ...status, foobar: Status[hasSucceeded] }))

      if (hasSucceeded === Status.success) {
        setFoo((fooState) => fooState - fooRequired)
        setBar((bar) => bar - barRequired)
        setFoobar((foobarState) => foobarState + 1)
      } else {
        // If it fails, a Foo is lost
        setFoo((fooState) => fooState - fooRequired)
      }
    }
  }

  const resetContext = () => {
    // Reset all global context value to default
    setFoo(defaultRobotsResources.foo)
    setBar(defaultRobotsResources.bar)
    setFoobar(defaultRobotsResources.foobar)
    setRobot(defaultRobotsResources.robot)
    setResultStatus((status) => ({ ...status, reset: Status.success }))
  }

  const cleanReset = () => {
    setResultStatus(defaultStatus)
  }

  return (
    <RobotsContext.Provider
      value={{
        bar: barState,
        buildFoobar,
        buyRobot,
        cleanReset,
        foo: fooState,
        foobar: foobarState,
        incrementBar,
        incrementFoo,
        resetContext,
        resultStatus,
        robot: robotState,
      }}
    >
      {children}
    </RobotsContext.Provider>
  )
}
