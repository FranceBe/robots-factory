import { act, renderHook } from '@testing-library/react-hooks'
import { ResourceType } from 'contexts/robotsContext/robotContext'
import { RobotsContextProvider, useRobotsContext } from 'contexts/robotsContext/robotsContext.hook'
import {
  defaultRobotsResources,
  defaultStatus,
} from 'contexts/robotsContext/robotsContext.variables'
import React from 'react'
import { Status } from 'utils/common.enum'

const Wrapper: React.FC = ({ children, ...props }) => (
  <RobotsContextProvider {...props}>{children}</RobotsContextProvider>
)

describe('useRobotsContext', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  const initTest = (props?: Partial<ResourceType>) =>
    renderHook(useRobotsContext, {
      initialProps: {
        ...defaultRobotsResources,
        ...props,
      },
      wrapper: Wrapper,
    })
  it('should return defaultRobotsResources by default', () => {
    const { result } = renderHook(useRobotsContext)
    const { foo, bar, foobar, robot } = result.current
    expect(foo).toBe(defaultRobotsResources.foo)
    expect(bar).toBe(defaultRobotsResources.bar)
    expect(foobar).toBe(defaultRobotsResources.foobar)
    expect(robot).toBe(defaultRobotsResources.robot)
  })
  it('should provide an incrementFoo function that add 1 foo to context', () => {
    const { result } = initTest()

    act(() => {
      result.current.incrementFoo()
    })

    expect(result.current.foo).toBe(defaultRobotsResources.foo + 1)
    expect(result.current.resultStatus).toEqual({ ...defaultStatus, foo: Status.success })
  })
  it('should provide an incrementBar function that add 1 bar to context', () => {
    const { result } = renderHook(useRobotsContext, { wrapper: Wrapper })

    act(() => {
      result.current.incrementBar()
    })

    expect(result.current.bar).toBe(defaultRobotsResources.bar + 1)
    expect(result.current.resultStatus).toEqual({ ...defaultStatus, bar: Status.success })
  })
  it('should provide a buyRobot function that does not change robot context if there is not enough foobar or foo', () => {
    const { result } = renderHook(useRobotsContext, { wrapper: Wrapper })

    act(() => {
      result.current.buyRobot()
    })

    expect(result.current.robot).toBe(defaultRobotsResources.robot)
    expect(result.current.resultStatus).toEqual(defaultStatus)
  })
  it('should provide a buyRobot function that add 1 robot to context and remove 6 foo and 3 foobar', () => {
    const initialProps = {
      foo: 6,
      foobar: 3,
    }
    const { result } = initTest(initialProps)

    act(() => {
      result.current.buyRobot()
    })

    expect(result.current.robot).toBe(defaultRobotsResources.robot + 1)
    expect(result.current.foo).toBe(initialProps.foo - 6)
    expect(result.current.foobar).toBe(initialProps.foobar - 3)
    expect(result.current.resultStatus).toEqual({ ...defaultStatus, robot: Status.success })
  })
  it('should provide a buildFoobar function that does not change foobar context if there is not enough foo or bar', () => {
    const { result } = initTest()

    act(() => {
      result.current.buildFoobar()
    })

    expect(result.current.foobar).toBe(defaultRobotsResources.foobar)
    expect(result.current.resultStatus).toBe(defaultStatus)
  })
  it('should provide a buyRobot function that add 1 foobar to context and remove 1 foo and 1 foobar if it succeed', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.01)
    // Math.random is mocked to return 0.01 so hasFoobarSucceeded() returns true
    const initialProps = {
      bar: 1,
      foo: 1,
    }
    const { result } = initTest(initialProps)

    act(() => {
      result.current.buildFoobar()
    })

    expect(result.current.foobar).toBe(defaultRobotsResources.foobar + 1)
    expect(result.current.foo).toBe(initialProps.foo - 1)
    expect(result.current.bar).toBe(initialProps.bar - 1)
    expect(result.current.resultStatus).toEqual({ ...defaultStatus, foobar: Status.success })
  })
  it('should provide a buyRobot function that remove 1 foo if it fails', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8)
    // Math.random is mocked to return 0.8 so hasFoobarSucceeded() returns false
    const initialProps = {
      bar: 1,
      foo: 1,
    }
    const { result } = initTest(initialProps)

    act(() => {
      result.current.buildFoobar()
    })

    expect(result.current.foobar).toBe(defaultRobotsResources.foobar)
    expect(result.current.foo).toBe(initialProps.foo - 1)
    expect(result.current.bar).toBe(initialProps.bar)
    expect(result.current.resultStatus).toEqual({ ...defaultStatus, foobar: Status.failure })
  })
  it('should provide a resetContext function that reset context to its default values', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8)
    // Math.random is mocked to return 0.8 so hasFoobarSucceeded() returns false
    const initialProps = {
      bar: 1,
      foo: 1,
      foobar: 3,
      robot: 5,
    }
    const { result } = initTest(initialProps)

    expect(result.current.bar).toBe(initialProps.bar)
    expect(result.current.foo).toBe(initialProps.foo)
    expect(result.current.foobar).toBe(initialProps.foobar)
    expect(result.current.robot).toBe(initialProps.robot)

    act(() => {
      result.current.resetContext()
    })

    expect(result.current.bar).toBe(defaultRobotsResources.bar)
    expect(result.current.foo).toBe(defaultRobotsResources.foo)
    expect(result.current.foobar).toBe(defaultRobotsResources.foobar)
    expect(result.current.robot).toBe(defaultRobotsResources.robot)
  })
  it('should provide a cleanReset function that reset status to its default values', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8)
    // Math.random is mocked to return 0.8 so hasFoobarSucceeded() returns false
    const initialProps = {
      bar: 1,
      foo: 1,
      foobar: 3,
      robot: 5,
    }
    const { result } = initTest(initialProps)

    act(() => {
      result.current.cleanReset()
    })

    expect(result.current.resultStatus).toBe(defaultStatus)
  })
})
