// Robot manager container handle the behaviour when a robot's activity
// is chosen by player
import { RobotCard } from 'components/RobotCard'
import { RobotManagerProps } from 'containers/RobotManager/robotManager'
import { RobotManagerContainer } from 'containers/RobotManager/robotManager.style'
import { hasEnoughResource } from 'containers/RobotManager/robotManager.utils'
import {
  requirementsForAFoobar,
  requirementsForARobot,
  tooltipTexts,
} from 'containers/RobotManager/robotManager.variables'
import { useRobotsContext } from 'contexts/robotsContext'
import { useActivity } from 'hooks/useActivity'
import React, { useEffect } from 'react'
import { ActivityName } from 'utils/common.enum'

export const RobotManager: React.FC<RobotManagerProps> = ({ robotId, shouldStop }) => {
  // get RobotsContext
  const { ...context } = useRobotsContext()

  // Custom hook to set an activity & its results
  const { currentActivity, currentInfo, startActivity, taskTime, timeLeft, cleanActivity } =
    useActivity()

  useEffect(() => {
    if (shouldStop) {
      cleanActivity()
    }
  }, [shouldStop])

  const handleClick = (activity: ActivityName) => {
    const shouldMove = currentActivity && activity !== currentActivity

    // If the robot was already doing an activity when the function is called
    // with a different activity, then the robot is considered as "moving"
    const currentActivityToSet: ActivityName = shouldMove
      ? ActivityName.moving
      : ActivityName[activity]
    // If the robot is moving, then the futureActivity is the one provided to the function
    const futureActivity: ActivityName | undefined = shouldMove ? activity : undefined

    // Call startActivity from useActivity hook with the current activity and the future activity
    startActivity(currentActivityToSet, futureActivity)
  }

  return (
    <RobotManagerContainer
      data-testid={'robot-manager'}
      foobarfoo={`${hasEnoughResource(ActivityName.foo, context.foo, ActivityName.foobar)}`}
      foobarbar={`${hasEnoughResource(ActivityName.bar, context.bar, ActivityName.foobar)}`}
      robotfoo={`${hasEnoughResource(ActivityName.foobar, context.foo, ActivityName.robot)}`}
      robotfoobar={`${hasEnoughResource(ActivityName.foobar, context.foobar, ActivityName.robot)}`}
    >
      <RobotCard
        fooButton={{
          isActive: currentActivity === ActivityName.foo,
          onClick: () => handleClick(ActivityName.foo),
        }}
        barButton={{
          isActive: currentActivity === ActivityName.bar,
          onClick: () => handleClick(ActivityName.bar),
        }}
        foobarButton={{
          disabled:
            context.foo < requirementsForAFoobar.foo || context.bar < requirementsForAFoobar.bar,
          isActive: currentActivity === ActivityName.foobar,
          onClick: () => handleClick(ActivityName.foobar),
          tooltipText: tooltipTexts.foobar,
        }}
        robotButton={{
          disabled:
            context.foo < requirementsForARobot.foo ||
            context.foobar < requirementsForARobot.foobar,
          isActive: currentActivity === ActivityName.robot,
          onClick: () => handleClick(ActivityName.robot),
          tooltipText: tooltipTexts.robot,
        }}
        robotId={robotId}
        loadingBar={{
          taskTime: taskTime,
          timeLeft: timeLeft,
        }}
        iconInfo={currentInfo.iconInfo}
        textInfo={currentInfo.textInfo}
      />
    </RobotManagerContainer>
  )
}

export default RobotManager
