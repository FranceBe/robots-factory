// Use activity hook handles the behaviour for each activity, it starts the activity & update context
// When activity is done
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
  startActivity: (activity: ActivityType, futureActivity?: ActivityType) => void
  timeBase: number
  timeLeft: number
} => {
  // Use useTimer hook
  const { timeLeft, startCounter, status, stopCounter } = useTimer()

  // Use useRobotContext hook
  const { buildFoobar, buyRobot, incrementBar, incrementFoo, resultStatus } = useRobotsContext()

  const [currentActivity, setCurrentActivity] = useState<ActivityType>()
  const [futureActivity, setFutureActivity] = useState<ActivityType>()
  const [currentInfo, setCurrentInfo] = useState<InfoType>(emptyInfo)
  const [barTimeBase, setBarTimeBase] = useState(getBarTime())
  const [timeBase, setTimeBase] = useState<number>(0)

  useEffect(() => {
    let timer: NodeJS.Timer
    if (status === statusTimer.done) {
      // When timer is done, set activity results
      onActivityEnd(currentActivity)
    }

    if (status === statusTimer.done && currentActivity === nameByActivity.moving) {
      // Set future activity when robot has moved
      timer = setTimeout(() => startActivity(futureActivity), 500)
    }

    if (status === statusTimer.done && currentActivity === nameByActivity.foo) {
      // Set Foo activity again, repeatedly 500ms after the end of previous Foo activity
      timer = setTimeout(() => startActivity(currentActivity), 500)
    }

    if (status === statusTimer.done && currentActivity === nameByActivity.bar) {
      // Set Bar activity again, repeatedly 500ms after the end of previous Bar activity
      timer = setTimeout(() => startActivity(currentActivity), 500)
    }

    return () => clearTimeout(timer)
  }, [status])

  useEffect(() => {
    if (status === statusTimer.done) {
      // Update the icon and text info after an activity is done
      setResultInfo(currentActivity)
    }
    if (resultStatus === 'reset') {
      // Clean states and stop counter when resultStatus is null
      stopCounter()
      setTimeBase(0)
      setCurrentInfo(emptyInfo)
      setCurrentActivity(undefined)
    }
  }, [resultStatus, status])

  const startActivity = (activity: ActivityType, futureActivity?: ActivityType): void => {
    if (activity) {
      // By default, timeBase is provided by the object timeBaseByActivity
      let timeBaseForActivity: number = timeBaseByActivity[activity]

      setCurrentActivity(activity)
      setCurrentInfo(infoByActivity[activity].current)

      if (activity === nameByActivity.bar) {
        // If activity is "bar", timeBase is calculated with getBarTime() and stored in
        // barTimeBase state
        timeBaseForActivity = barTimeBase
      }
      // Update state timeBase
      setTimeBase(timeBaseForActivity)
      // Start counter
      startCounter(timeBaseForActivity)
    }

    if (activity === nameByActivity.moving && futureActivity) {
      // If robot is moving and a future activity is provided,
      // store the future activity in state
      setFutureActivity(futureActivity)
    }
  }

  const onActivityEnd = (activity: ActivityType): void => {
    // Update context depending on the provided activity
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
    // Set info icon & text to display after activity ended
    if (resultStatus && activity) {
      setCurrentInfo(infoByActivity[activity][resultStatus])
    }
  }
  return {
    currentActivity,
    currentInfo,
    startActivity,
    timeBase,
    timeLeft,
  }
}
