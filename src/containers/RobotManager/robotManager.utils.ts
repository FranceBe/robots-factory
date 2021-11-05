import { ButtonProps } from 'components/Button/button'
import {
  requirementsForAFoobar,
  requirementsForARobot,
  tooltipTexts,
} from 'containers/RobotManager/robotManager.variables'
import { ResourceType } from 'contexts/robotsContext/robotContext'
import { ActivityType } from 'hooks/useActivity/useActivity'
import { nameByActivity } from 'hooks/useActivity/useActivity.variables'
import { ThemeType } from 'utils/common.variables'

// Function that returns a boolean
// Depending on if the current context has enough resource
// To build a foobar or to buy a robot
export const hasEnoughResource = (
  resource: ActivityType,
  contextResource: number,
  target: ActivityType,
): boolean => {
  if (target && resource) {
    if (target === nameByActivity.foobar) {
      return contextResource >= requirementsForAFoobar[resource]
    } else {
      return contextResource >= requirementsForARobot[resource]
    }
  } else return false
}

// Create button list to display in RobotCard
// Depending on states and context in RobotManager container
export const getButtons = (
  currentActivity: ActivityType,
  action: (activity: ActivityType) => void,
  context: ResourceType,
): ButtonProps[] => {
  return [
    {
      buttonType: ThemeType.primary,
      children: 'Miner Foo',
      isActive: currentActivity === nameByActivity.foo,
      onClick: () => action(nameByActivity.foo),
    },
    {
      buttonType: ThemeType.primary,
      children: 'Miner Bar',
      isActive: currentActivity === nameByActivity.bar,
      onClick: () => action(nameByActivity.bar),
    },
    {
      buttonType: ThemeType.primary,
      children: 'Assembler Foobar',
      // The "Build Foobar" button is disabled when there is not enough Foo or Bar in context
      disabled:
        context.foo < requirementsForAFoobar.foo || context.bar < requirementsForAFoobar.bar,
      isActive: currentActivity === nameByActivity.foobar,
      onClick: () => action(nameByActivity.foobar),
      tooltipText: tooltipTexts.foobar,
    },
    {
      buttonType: ThemeType.secondary,
      children: 'Acheter un robot',
      // The "Buy a robot" button is disabled when there is not enough Foo or Foobar in context
      disabled:
        context.foo < requirementsForARobot.foo || context.foobar < requirementsForARobot.foobar,
      isActive: currentActivity === nameByActivity.robot,
      onClick: () => action(nameByActivity.robot),
      tooltipText: tooltipTexts.robot,
    },
  ]
}
