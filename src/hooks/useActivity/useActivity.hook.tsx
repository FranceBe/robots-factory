// Use activity hook handles the behaviour for each activity, it starts the activity & update context
// When activity is done
import { useRobotsContext } from 'contexts/robotsContext'
import { ActivityType, InfoType, UseActivityType } from 'hooks/useActivity/useActivity'
import { getBarTime } from 'hooks/useActivity/useActivity.utils'
import { emptyInfo, infoByActivity } from 'hooks/useActivity/useActivity.variables'
import { useTimer } from 'hooks/useTimer'
import { useEffect, useState } from 'react'
import { ActivityName, TimerStatus } from 'utils/common.enum'
import { requirement, taskTimeByActivity } from 'utils/settings'

export const useActivity = (): UseActivityType => {
  // Use useTimer hook
  const { timeLeft, startCounter, status, stopCounter } = useTimer()

  // Use useRobotContext hook
  const { buildFoobar, buyRobot, incrementBar, incrementFoo, resultStatus, foo, bar, cleanReset } =
    useRobotsContext()

  const [currentActivity, setCurrentActivity] = useState<ActivityType>()
  const [futureActivity, setFutureActivity] = useState<ActivityType>()
  const [currentInfo, setCurrentInfo] = useState<InfoType>(emptyInfo)
  const [taskTime, setTimeBase] = useState<number>(0)

  useEffect(() => {
    let timer: NodeJS.Timer
    const activityIsDone = status === TimerStatus.done

    if (activityIsDone) {
      // When timer is done, call onActivityEnd
      onActivityEnd(currentActivity)
    }

    const isMoving = currentActivity === ActivityName.moving
    const isBuildingFoobar = currentActivity === ActivityName.foobar
    const hasEnoughResourcesForFoobar = foo > requirement.foobar.foo && bar > requirement.foobar.bar

    if (
      activityIsDone &&
      (isMoving ||
        currentActivity === ActivityName.foo ||
        currentActivity === ActivityName.bar ||
        isBuildingFoobar)
    ) {
      // If robot is moving, it should start the futureActivity
      // If the robot is not moving, it should start again current activity
      const activityToStart = isMoving ? futureActivity : currentActivity

      // If robot is moving, mining Foo or mining Bar then start activity after 500ms
      // If roboto is building a Foobar, start activity after 500ms only if there are enough resources
      if (!isBuildingFoobar || (isBuildingFoobar && hasEnoughResourcesForFoobar)) {
        timer = setTimeout(() => startActivity(activityToStart), 500)
      }
    }
    return () => clearTimeout(timer)
  }, [status])

  useEffect(() => {
    if (status === TimerStatus.done) {
      // Update the icon and text info after an activity is done
      setResultInfo(currentActivity)
    }
  }, [resultStatus, status])

  const startActivity = (activity: ActivityType, futureActivity?: ActivityType): void => {
    if (activity) {
      // By default, taskTime is provided by the object taskTimeByActivity
      let taskTimeForActivity: number = taskTimeByActivity[activity]

      setCurrentActivity(activity)
      setCurrentInfo(infoByActivity[activity].current)

      if (activity === ActivityName.bar) {
        // If activity is "bar", taskTime is calculated with getBarTime() and stored in
        // barTimeBase state
        taskTimeForActivity = getBarTime()
      }
      // Update state taskTime
      setTimeBase(taskTimeForActivity)
      // Start counter
      startCounter(taskTimeForActivity)
    }

    if (activity === ActivityName.moving && futureActivity) {
      // If robot is moving and a future activity is provided,
      // store the future activity in state
      setFutureActivity(futureActivity)
    }
  }

  const onActivityEnd = (activity: ActivityType): void => {
    // Update context depending on the provided activity
    if (activity) {
      if (activity === ActivityName.foo) {
        incrementFoo()
      }

      if (activity === ActivityName.bar) {
        incrementBar()
      }

      if (activity === ActivityName.foobar) {
        buildFoobar()
      }

      if (activity === ActivityName.robot) {
        buyRobot()
      }
    }
  }

  const setResultInfo = (activity: ActivityType) => {
    // Set info icon & text to display after activity ended
    if (resultStatus && activity) {
      setCurrentInfo(infoByActivity[activity][resultStatus[activity]])
    }
  }

  const cleanActivity = () => {
    stopCounter()
    setTimeBase(0)
    setCurrentInfo(emptyInfo)
    setCurrentActivity(undefined)
    cleanReset()
  }

  return {
    cleanActivity,
    currentActivity,
    currentInfo,
    startActivity,
    taskTime,
    timeLeft,
  }
}
