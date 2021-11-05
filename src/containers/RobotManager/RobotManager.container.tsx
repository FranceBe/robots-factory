// Robot manager container handle the behaviour when a robot's activity
// is chosen by player
import { RobotCard } from 'components/RobotCard'
import { RobotManagerProps } from 'containers/RobotManager/robotManager'
import { RobotManagerContainer } from 'containers/RobotManager/robotManager.style'
import { getButtons, hasEnoughResource } from 'containers/RobotManager/robotManager.utils'
import { useRobotsContext } from 'contexts/robotsContext'
import { useActivity } from 'hooks/useActivity'
import { ActivityType } from 'hooks/useActivity/useActivity'
import { nameByActivity } from 'hooks/useActivity/useActivity.variables'
import React from 'react'

export const RobotManager: React.FC<RobotManagerProps> = ({ robotId }) => {
  // get RobotsContext
  const { ...context } = useRobotsContext()

  // Custom hook to set an activity & its results
  const { currentActivity, currentInfo, startActivity, timeBase, timeLeft } = useActivity()

  // Function called on button click
  const doActivity = (activity: ActivityType) => {
    const isMoving = currentActivity && activity !== currentActivity

    // If the robot was already doing an activity  when the function is called
    // with a different activity, then the robot is considered as "moving"
    const currentActivityToSet: ActivityType = isMoving ? nameByActivity.moving : activity
    // If the robot is moving, then the futureActivity is the one provided to the function
    const futureActivity: ActivityType = isMoving ? activity : undefined

    // Call startActivity from useActivity hook with the current activity and the future activity
    startActivity(currentActivityToSet, futureActivity)
  }

  return (
    <RobotManagerContainer
      data-testid={'robot-manager'}
      foobarfoo={`${hasEnoughResource(nameByActivity.foo, context.foo, nameByActivity.foobar)}`}
      foobarbar={`${hasEnoughResource(nameByActivity.bar, context.bar, nameByActivity.foobar)}`}
      robotfoo={`${hasEnoughResource(nameByActivity.foobar, context.foo, nameByActivity.robot)}`}
      robotfoobar={`${hasEnoughResource(
        nameByActivity.foobar,
        context.foobar,
        nameByActivity.robot,
      )}`}
    >
      <RobotCard
        buttons={getButtons(currentActivity, doActivity, context)}
        robotId={robotId}
        loadingBar={{
          timeBase: timeBase,
          timeLeft: timeLeft,
        }}
        iconInfo={currentInfo.iconInfo}
        textInfo={currentInfo.textInfo}
      />
    </RobotManagerContainer>
  )
}

export default RobotManager
