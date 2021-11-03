import { ResourceType, ResultStatus, RobotsResourceType } from 'contexts/robotsContext/robotContext'
import { hasFoobarSucceeded } from 'contexts/robotsContext/robotContext.utils'
import {
  defaultRobotsResources,
  initialRobotContext,
  resultByStatus,
} from 'contexts/robotsContext/robotsContext.variables'
import { ContextType, createContext, ReactNode, useContext } from 'react'
import React, { useState } from 'react'

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
  const [resultStatus, setResultStatus] = useState<ResultStatus>()

  const incrementFoo = () => {
    setFoo((fooState) => fooState + 1)
    setResultStatus(resultByStatus.success)
  }

  const incrementBar = () => {
    setBar((barState) => barState + 1)
    setResultStatus(resultByStatus.success)
  }

  const buyRobot = () => {
    if (fooState >= 6 && foobarState >= 3) {
      setFoo((fooState) => fooState - 6)
      setFoobar((foobarState) => foobarState - 3)
      setRobot((robotState) => robotState + 1)
      setResultStatus(resultByStatus.success)
    }
  }

  const buildFoobar = () => {
    if (fooState >= 1 && barState >= 1) {
      const hasSucceeded = hasFoobarSucceeded()
      setResultStatus(hasSucceeded)
      if (hasSucceeded === resultByStatus.success) {
        setFoo((fooState) => fooState - 1)
        setBar((bar) => bar - 1)
        setFoobar((foobarState) => foobarState + 1)
      } else {
        setFoo((fooState) => fooState - 1)
      }
    }
  }

  const resetContext = () => {
    setFoo(defaultRobotsResources.foo)
    setBar(defaultRobotsResources.bar)
    setFoobar(defaultRobotsResources.foobar)
    setRobot(defaultRobotsResources.robot)
    setResultStatus(null)
  }

  return (
    <RobotsContext.Provider
      value={{
        bar: barState,
        buildFoobar,
        buyRobot,
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
