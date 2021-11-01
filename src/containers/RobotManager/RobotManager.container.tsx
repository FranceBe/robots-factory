import { RobotCard } from 'components/RobotCard'
import {
  getBarTime,
  getButtons,
  getLoadingBarTimeBase,
  hasEnoughResource,
  hasFoobarSucceed,
} from 'containers/RobotManager/robotManager.service'
import { RobotManagerContainer } from 'containers/RobotManager/robotManager.style'
import {
  barName,
  foobarName,
  fooName,
  infosIcon,
  infosText,
  robotName,
  timeBases,
} from 'containers/RobotManager/robotManager.variables'
import {
  ActivityType,
  InfoType,
  RobotManagerProps,
} from 'containers/RobotManager/types/robotManager'
import { useGlobalContext } from 'hooks/globalContext'
import { useTimer } from 'hooks/useTimer'
import React, { useEffect, useState } from 'react'

export const RobotManager: React.FC<RobotManagerProps> = ({ robotId }) => {
  // Custom hook to set a timer
  const { timeLeft, startCounter, stopCounter, status } = useTimer()
  // get GlobalContext
  const { setContext, ...context } = useGlobalContext()
  // set state for current activity
  const [activeActivity, setActiveActivity] = useState<ActivityType | undefined>(undefined)
  // set state to define if robot is moving from an activity to another
  const [isMoving, setMoving] = useState(false)
  // set state to define the BarTimeBase for each time
  const [barTimeBase, setBarTimeBase] = useState(getBarTime())
  // set state to define which icon & text info display for each case
  const [info, setInfo] = useState<InfoType>({
    iconInfo: undefined,
    textInfo: '',
  })

  useEffect(() => {
    let timer: NodeJS.Timer

    if (activeActivity && status === 'done') {
      // When counter is done, call endActivity
      const activityDone = isMoving ? 'moving' : activeActivity
      endActivity(activityDone)
    }
    if (isMoving && status === 'done' && activeActivity) {
      // When counter is done and robot was moving,
      // Start new activity
      timer = setTimeout(() => startActivity(activeActivity), 500)
    }
    return () => {
      if (status === 'stopped') {
        clearTimeout(timer)
      }
    }
  }, [status])

  const startActivity = (activity: ActivityType) => {
    if (activeActivity && activeActivity !== activity) {
      // If there is a current activeActivity and startActivity is called
      // with a different activity, then the robot start moving
      setMoving(true)

      startCounter(timeBases.moving)

      setInfo({ iconInfo: infosIcon.moving, textInfo: infosText.moving })
    } else {
      // If there is not current activeActivity or if startActivity is called
      // with the same activity, then robot start this activity
      setMoving(false)
      // Time base is calculated either with the timeBases object reference
      // or with the barTimeBase that depends on the function getBarTime()
      // to get a random new baseTime
      const timeBase = activity === 'bar' ? barTimeBase : timeBases[activity]

      startCounter(timeBase)

      setInfo({
        iconInfo: infosIcon[activity],
        textInfo: infosText[activity],
      })
    }
    // In all cases, set a new currentActivity with provided activity
    setActiveActivity(activity)
  }

  const endActivity = (activity: ActivityType | 'moving') => {
    if (activity === 'moving') {
      // If robot was moving, then stop moving
      setMoving(false)
    } else {
      getActivityResults(activity)
    }
    if (activity === barName) {
      // If robot was mining bar, get a new barTimeBase for next time
      setBarTimeBase(getBarTime())
    }
    // In all cases, stop counter
    stopCounter()
  }

  const getActivityResults = (activity: ActivityType) => {
    if (activity === foobarName) {
      // if current activity is "foobar", there is 2 end cases
      const hasSucceeded = hasFoobarSucceed()
      // either it succeed and context is updated with
      // 1 foo and 1 bar less, and 1 foobar more
      // or it fails and context is updated with 1 foo less
      const newContext = hasSucceeded
        ? {
            ...context,
            bar: context.bar - 1,
            foo: context.foo - 1,
            foobar: context.foobar + 1,
          }
        : { ...context, foo: context.foo - 1 }

      // info is set with success or failure message & icon
      const infoKey = hasSucceeded ? 'foobar_success' : 'foobar_fail'
      setContext(newContext)
      setInfo({
        iconInfo: infosIcon[infoKey],
        textInfo: infosText[infoKey],
      })
    } else if (activity === robotName) {
      // if current activity is "robot"
      // context is updated with 6 foo and 3 foobar less and 1 robot more
      setContext({
        ...context,
        foo: context.foo - 6,
        foobar: context.foobar - 3,
        robot: context.robot + 1,
      })
      // info is set with success message & icon
      setInfo({
        iconInfo: infosIcon['robot'],
        textInfo: infosText['robot'],
      })
    } else {
      // if current activity is "foo" or "bar"
      // Then context is updated with 1 more of "foo" or "bar"
      // depending of the current activity
      setContext({ ...context, [activity]: context[activity] + 1 })
      const key = `${[activity]}_success`
      setInfo({
        iconInfo: infosIcon[key],
        textInfo: infosText[key],
      })
    }
  }

  return (
    <RobotManagerContainer
      data-testid={'robot-manager'}
      foobarfoo={`${hasEnoughResource(fooName, context.foo, foobarName)}`}
      foobarbar={`${hasEnoughResource(barName, context.bar, foobarName)}`}
      robotfoo={`${hasEnoughResource(fooName, context.foo, robotName)}`}
      robotfoobar={`${hasEnoughResource(foobarName, context.foobar, robotName)}`}
    >
      <RobotCard
        buttons={getButtons(activeActivity, startActivity, context)}
        robotId={robotId}
        loadingBar={{
          timeBase: getLoadingBarTimeBase(isMoving, activeActivity, barTimeBase),
          timeLeft: timeLeft,
        }}
        iconInfo={info.iconInfo}
        textInfo={info.textInfo}
      />
    </RobotManagerContainer>
  )
}

export default RobotManager
