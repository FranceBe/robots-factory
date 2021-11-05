import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useRobotsContext } from 'contexts/robotsContext/robotsContext.hook'
import { ActivityType } from 'hooks/useActivity/useActivity'
import { useActivity } from 'hooks/useActivity/useActivity.hook'
import * as service from 'hooks/useActivity/useActivity.utils'
import {
  emptyInfo,
  infoByActivity,
  timeBaseByActivity,
} from 'hooks/useActivity/useActivity.variables'
import { useTimer } from 'hooks/useTimer'

jest.mock('contexts/robotsContext/robotsContext.hook')
jest.mock('hooks/useTimer')
const useRobotsContextMock = useRobotsContext as jest.Mock
const useTimerMock = useTimer as jest.Mock

describe('useActivity', () => {
  const incrementFoo = jest.fn()
  const incrementBar = jest.fn()
  const buyRobot = jest.fn()
  const buildFoobar = jest.fn()
  const startCounter = jest.fn()
  const stopCounter = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
    useRobotsContextMock.mockReturnValue({
      buildFoobar,
      buyRobot,
      incrementBar,
      incrementFoo,
      resultStatus: undefined,
    })
    useTimerMock.mockReturnValue({
      startCounter,
      status: 'pending',
      stopCounter,
      timeLeft: 0.1,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return an undefined current activity when startActivity is called with undefined params', () => {
    const { result } = renderHook(useActivity)
    const { startActivity } = result.current

    act(() => {
      startActivity(undefined)
    })

    expect(result.current.currentActivity).toBe(undefined)
  })
  const casesSetActivity: [ActivityType, number][] = [
    ['foo', timeBaseByActivity.foo],
    ['bar', 0.5],
    ['foobar', timeBaseByActivity.foobar],
    ['robot', timeBaseByActivity.robot],
    ['moving', timeBaseByActivity.moving],
  ]
  it.each(casesSetActivity)(
    'should return currentActivity as %s and corresponding currentInfo & timeBase',
    (activityName: ActivityType, timeBase: number) => {
      // Mock getBarTime to return 0.5
      jest.spyOn(service, 'getBarTime').mockReturnValue(0.5)
      const { result } = renderHook(useActivity)
      const { startActivity } = result.current

      expect(result.current.currentActivity).toBe(undefined)

      act(() => {
        startActivity(activityName)
      })

      if (activityName) {
        expect(result.current.currentActivity).toBe(activityName)
        expect(result.current.currentInfo).toEqual(infoByActivity[activityName].current)
        expect(result.current.timeBase).toEqual(timeBase)
      }
    },
  )
  it.each(casesSetActivity)(
    'should call startCounter with %s timeBase',
    (activityName: ActivityType, timeBase: number) => {
      // Mock getBarTime to return 0.5
      jest.spyOn(service, 'getBarTime').mockReturnValue(0.5)

      const { result } = renderHook(useActivity)
      const { startActivity } = result.current

      act(() => {
        startActivity(activityName)
      })

      expect(startCounter).toHaveBeenCalledTimes(1)
      expect(startCounter).toHaveBeenCalledWith(timeBase)
    },
  )

  const casesContext: [ActivityType, jest.Mock][] = [
    ['foo', incrementFoo],
    ['bar', incrementBar],
    ['foobar', buildFoobar],
    ['robot', buyRobot],
  ]

  it.each(casesContext)(
    'should update %s context when status is "done"',
    (activityName: ActivityType, contextFn: jest.Mock) => {
      useTimerMock
        .mockReturnValue({
          startCounter,
          status: 'done',
          timeLeft: 0,
        })
        .mockReturnValueOnce({
          startCounter,
          status: 'pending',
          timeLeft: 0.1,
        })

      const { result } = renderHook(useActivity)
      const { startActivity } = result.current

      act(() => {
        startActivity(activityName)
      })

      expect(contextFn).toHaveBeenCalledTimes(1)
    },
  )
  it('should start the next activity when moving is done', () => {
    useTimerMock
      .mockReturnValue({
        startCounter,
        status: 'done',
        timeLeft: 0,
      })
      .mockReturnValueOnce({
        startCounter,
        status: 'pending',
        timeLeft: 0.1,
      })

    const { result } = renderHook(useActivity)
    const { startActivity } = result.current

    act(() => {
      startActivity('moving', 'bar')
      // Fast forward so the timeout of 500ms is done
      jest.advanceTimersByTime(600)
    })

    expect(result.current.currentActivity).toBe('bar')
    expect(startCounter).toHaveBeenCalledTimes(2)
  })

  const casesResult: [ActivityType, string][] = [
    ['foo', 'success'],
    ['bar', 'success'],
    ['foobar', 'success'],
    ['robot', 'success'],
    ['moving', 'success'],
    ['foo', 'failure'],
    ['bar', 'failure'],
    ['foobar', 'failure'],
    ['robot', 'failure'],
    ['moving', 'failure'],
  ]
  it.each(casesResult)(
    'should return the %s %s info',
    (activityName: ActivityType, activityResult: string) => {
      useRobotsContextMock.mockReturnValue({
        buildFoobar,
        buyRobot,
        incrementBar,
        incrementFoo,
        resultStatus: activityResult,
      })
      useTimerMock
        .mockReturnValue({
          startCounter,
          status: 'done',
          timeLeft: 0,
        })
        .mockReturnValueOnce({
          startCounter,
          status: 'pending',
          timeLeft: 0.1,
        })
      const { result } = renderHook(useActivity)
      const { startActivity } = result.current

      act(() => {
        startActivity(activityName)
      })
      if (activityName) {
        expect(result.current.currentInfo).toEqual(infoByActivity[activityName][activityResult])
      }
    },
  )

  const casesRepeat: ActivityType[] = ['foo', 'bar']
  it.each(casesRepeat)(
    'should repeat startCounter when activity is %s',
    (activityName: ActivityType) => {
      useTimerMock
        .mockReturnValue({
          startCounter,
          status: 'done',
          timeLeft: 0,
        })
        .mockReturnValueOnce({
          startCounter,
          status: 'pending',
          timeLeft: 0.1,
        })

      const { result } = renderHook(useActivity)
      const { startActivity } = result.current

      act(() => {
        startActivity(activityName)
        // Fast forward so the timeout of 500ms is done
        jest.advanceTimersByTime(600)
      })

      expect(startCounter).toHaveBeenCalledTimes(2)
    },
  )
  it('should call stopCounter and reset all value to default when resultStatus is null', () => {
    useRobotsContextMock
      .mockReturnValue({
        buildFoobar,
        buyRobot,
        incrementBar,
        incrementFoo,
        resultStatus: 'reset',
      })
      .mockReturnValueOnce({
        buildFoobar,
        buyRobot,
        incrementBar,
        incrementFoo,
        resultStatus: 'success',
      })
    const { result } = renderHook(useActivity)
    const { startActivity } = result.current

    act(() => {
      startActivity('foo')
    })

    expect(stopCounter).toHaveBeenCalledTimes(1)
    expect(result.current.currentInfo).toEqual(emptyInfo)
    expect(result.current.currentActivity).toEqual(undefined)
    expect(result.current.timeBase).toEqual(0)
  })
})
