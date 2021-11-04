import { useRobotsContext } from 'contexts/robotsContext'
import { ActivityType, InfoType } from 'hooks/useActivity/useActivity'
import { getBarTime } from 'hooks/useActivity/useActivity.utils'
import {
  emptyInfo,
  infoByActivity,
  nameByActivity,
  statusTimer,
  timeBaseByActivity,
} from 'hooks/useActivity/useActivity.variables'
import { useTimer } from 'hooks/useTimer'
import { useEffect, useState } from 'react'

export const useActivity = (): {
  currentActivity: ActivityType
  currentInfo: InfoType
  setActivity: (activity: ActivityType, futureActivity?: ActivityType) => void
  timeBase: number
  timeLeft: number
} => {
  const { timeLeft, startCounter, status, stopCounter } = useTimer()

  const { buildFoobar, buyRobot, incrementBar, incrementFoo, resultStatus } = useRobotsContext()

  const [currentActivity, setCurrentActivity] = useState<ActivityType>()
  const [futureActivity, setFutureActivity] = useState<ActivityType>()
  const [currentInfo, setCurrentInfo] = useState<InfoType>(emptyInfo)
  const [barTimeBase, setBarTimeBase] = useState(getBarTime())
  const [timeBase, setTimeBase] = useState<number>(0)

  useEffect(() => {
    let timer: NodeJS.Timer
    if (status === statusTimer.done) {
      setActivityResult(currentActivity)
    }

    if (status === statusTimer.done && currentActivity === nameByActivity.moving) {
      // Set future activity when robot has moved
      timer = setTimeout(() => setActivity(futureActivity), 500)
    }

    if (status === statusTimer.done && currentActivity === nameByActivity.foo) {
      // Set Foo activity again, repeatedly 500ms after the end of previous Foo activity
      timer = setTimeout(() => setActivity(currentActivity), 500)
    }

    if (status === statusTimer.done && currentActivity === nameByActivity.bar) {
      // Set Bar activity again, repeatedly 500ms after the end of previous Bar activity
      timer = setTimeout(() => setActivity(currentActivity), 500)
    }

    return () => clearTimeout(timer)
  }, [status])

  useEffect(() => {
    if (status === statusTimer.done) {
      // Update the icon and text info after an activity is done
      setResultInfo(currentActivity)
    }
    if (resultStatus === null) {
      // Clean states and stop counter when resultStatus is null
      stopCounter()
      setTimeBase(0)
      setCurrentInfo(emptyInfo)
      setCurrentActivity(undefined)
    }
  }, [resultStatus, status])

  const setActivity = (activity: ActivityType, futureActivity?: ActivityType): void => {
    if (activity) {
      let timeBaseForActivity: number = timeBaseByActivity[activity]
      setCurrentActivity(activity)
      setCurrentInfo(infoByActivity[activity].current)

      if (activity === nameByActivity.bar) {
        timeBaseForActivity = barTimeBase
      }

      setTimeBase(timeBaseForActivity)
      startCounter(timeBaseForActivity)
    }

    if (activity === nameByActivity.moving && futureActivity) {
      setFutureActivity(futureActivity)
    }
  }

  const setActivityResult = (activity: ActivityType): void => {
    if (activity) {
      if (activity === nameByActivity.foo) {
        incrementFoo()
      }

      if (activity === nameByActivity.bar) {
        setBarTimeBase(getBarTime())
        incrementBar()
      }

      if (activity === nameByActivity.foobar) {
        buildFoobar()
      }

      if (activity === nameByActivity.robot) {
        buyRobot()
      }
    }
  }

  const setResultInfo = (activity: ActivityType) => {
    if (resultStatus && activity) {
      setCurrentInfo(infoByActivity[activity][resultStatus])
    }
  }
  return {
    currentActivity,
    currentInfo,
    setActivity,
    timeBase,
    timeLeft,
  }
}
