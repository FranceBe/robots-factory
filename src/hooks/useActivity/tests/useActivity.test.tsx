import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useRobotsContext } from 'contexts/robotsContext/robotsContext.hook'
import { defaultStatus } from 'contexts/robotsContext/robotsContext.variables'
import { useActivity } from 'hooks/useActivity/useActivity.hook'
import * as service from 'hooks/useActivity/useActivity.utils'
import { emptyInfo, infoByActivity } from 'hooks/useActivity/useActivity.variables'
import { useTimer } from 'hooks/useTimer'
import { ActivityName, Status } from 'utils/common.enum'
import { taskTimeByActivity } from 'utils/settings'

jest.mock('contexts/robotsContext/robotsContext.hook')
jest.mock('hooks/useTimer')
const useRobotsContextMock = useRobotsContext as jest.Mock
const useTimerMock = useTimer as jest.Mock

describe('useActivity', () => {
  const incrementFoo = jest.fn()
  const incrementBar = jest.fn()
  const buyRobot = jest.fn()
  const buildFoobar = jest.fn()
  const cleanReset = jest.fn()
  const startCounter = jest.fn()
  const stopCounter = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
    useRobotsContextMock.mockReturnValue({
      bar: 0,
      buildFoobar,
      buyRobot,
      cleanReset,
      foo: 0,
      incrementBar,
      incrementFoo,
      resultStatus: defaultStatus,
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
  const casesSetActivity: [ActivityName, number][] = [
    [ActivityName.foo, taskTimeByActivity.foo],
    [ActivityName.bar, 0.5],
    [ActivityName.foobar, taskTimeByActivity.foobar],
    [ActivityName.robot, taskTimeByActivity.robot],
    [ActivityName.moving, taskTimeByActivity.moving],
  ]
  it.each(casesSetActivity)(
    'should return currentActivity as %s and corresponding currentInfo & taskTime',
    (activityName: ActivityName, taskTime: number) => {
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
        expect(result.current.taskTime).toEqual(taskTime)
      }
    },
  )
  it.each(casesSetActivity)(
    'should call startCounter with %s taskTime',
    (activityName: ActivityName, taskTime: number) => {
      // Mock getBarTime to return 0.5
      jest.spyOn(service, 'getBarTime').mockReturnValue(0.5)

      const { result } = renderHook(useActivity)
      const { startActivity } = result.current

      act(() => {
        startActivity(activityName)
      })

      expect(startCounter).toHaveBeenCalledTimes(1)
      expect(startCounter).toHaveBeenCalledWith(taskTime)
    },
  )

  const casesContext: [ActivityName, jest.Mock][] = [
    [ActivityName.foo, incrementFoo],
    [ActivityName.bar, incrementBar],
    [ActivityName.foobar, buildFoobar],
    [ActivityName.robot, buyRobot],
  ]

  it.each(casesContext)(
    'should update %s context when status is "done"',
    (activityName: ActivityName, contextFn: jest.Mock) => {
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
      startActivity(ActivityName.moving, ActivityName.bar)
      // Fast forward so the timeout of 500ms is done
      jest.advanceTimersByTime(600)
    })

    expect(result.current.currentActivity).toBe(ActivityName.bar)
    expect(startCounter).toHaveBeenCalledTimes(2)
  })

  const casesResult: [ActivityName, Status][] = [
    [ActivityName.foo, Status.success],
    [ActivityName.bar, Status.success],
    [ActivityName.foobar, Status.success],
    [ActivityName.robot, Status.success],
    [ActivityName.moving, Status.success],
    [ActivityName.foo, Status.failure],
    [ActivityName.bar, Status.failure],
    [ActivityName.foobar, Status.failure],
    [ActivityName.robot, Status.failure],
    [ActivityName.moving, Status.failure],
  ]
  it.each(casesResult)(
    'should return the %s %s info',
    (activityName: ActivityName, activityResult: string) => {
      useRobotsContextMock.mockReturnValue({
        buildFoobar,
        buyRobot,
        incrementBar,
        incrementFoo,
        resultStatus: { ...defaultStatus, [`${activityName}`]: activityResult },
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

  const casesRepeat: ActivityName[] = [ActivityName.foo, ActivityName.bar]
  it.each(casesRepeat)(
    'should repeat startCounter when activity is %s',
    (activityName: ActivityName) => {
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
  it('should repeat startCounter when activity is foobar only if there is enough resources in context', () => {
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

    useRobotsContextMock.mockReturnValue({
      bar: 3,
      buildFoobar,
      buyRobot,
      foo: 3,
      incrementBar,
      incrementFoo,
      resultStatus: defaultStatus,
    })

    const { result } = renderHook(useActivity)
    const { startActivity } = result.current

    act(() => {
      startActivity(ActivityName.foobar)
      // Fast forward so the timeout of 500ms is done
      jest.advanceTimersByTime(600)
    })

    expect(startCounter).toHaveBeenCalledTimes(2)
  })

  it('should not not repeat startCounter when activity is foobar if there is not enough resources', () => {
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

    useRobotsContextMock.mockReturnValue({
      bar: 0,
      buildFoobar,
      buyRobot,
      foo: 0,
      incrementBar,
      incrementFoo,
      resultStatus: defaultStatus,
    })

    const { result } = renderHook(useActivity)
    const { startActivity } = result.current

    act(() => {
      startActivity(ActivityName.foobar)
      // Fast forward so the timeout of 500ms is done
      jest.advanceTimersByTime(600)
    })

    expect(startCounter).toHaveBeenCalledTimes(1)
  })

  it('should call stopCounter and reset all value to default when cleanActivity is called', () => {
    const { result } = renderHook(useActivity)
    const { startActivity, cleanActivity } = result.current

    act(() => {
      startActivity(ActivityName.foo)
      cleanActivity()
    })

    expect(stopCounter).toHaveBeenCalledTimes(1)
    expect(result.current.currentInfo).toEqual(emptyInfo)
    expect(result.current.currentActivity).toEqual(undefined)
    expect(result.current.taskTime).toEqual(0)
  })
})
