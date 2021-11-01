import { ButtonProps } from 'components/Button/types/button'
import {
  barName,
  foobarName,
  fooName,
  requirementsForAFoobar,
  requirementsForARobot,
  robotName,
  timeBases,
  tooltipTexts,
} from 'containers/RobotManager/robotManager.variables'
import { ActivityType } from 'containers/RobotManager/types/robotManager'
import { ContextType } from 'hooks/types/globalContext'

// Function that returns a random number between 0.5 and 2
// The number will have 1 digit to the left of the decimal point (0.5, 0.6, ...)
// The function is used to get the mining bar time needed for a round
export const getBarTime = (): number => {
  return Math.round((Math.random() * (2 - 0.5) + 0.5) * 10) / 10
}

// Function that returns a boolean
// Returns true 60% of the time to calculate the
// percent of chance the robot has to build a new foobar
export const hasFoobarSucceed = (): boolean => {
  const foobarTry = Math.round(Math.random() * 100)
  return foobarTry <= 60
}

// Function that returns a boolean
// Depending on if the current context has enough resource
// To build a foobar or to buy a robot
export const hasEnoughResource = (
  resource: string,
  contextResource: number,
  target: string,
): boolean => {
  if (target === foobarName) {
    return contextResource >= requirementsForAFoobar[resource]
  } else {
    return contextResource >= requirementsForARobot[resource]
  }
}

// Create button list to display in RobotCard
// With correct info depending on states and context
// In RobotManager container
export const getButtons = (
  activeActivity: ActivityType | undefined,
  action: (activity: ActivityType) => void,
  context: ContextType,
): ButtonProps[] => {
  return [
    {
      buttonType: 'primary',
      children: 'Miner Foo',
      isActive: activeActivity === fooName,
      onClick: () => action(fooName),
    },
    {
      buttonType: 'primary',
      children: 'Miner Bar',
      isActive: activeActivity === barName,
      onClick: () => action(barName),
    },
    {
      buttonType: 'primary',
      children: 'Assembler Foobar',
      disabled:
        context.foo < requirementsForAFoobar.foo || context.bar < requirementsForAFoobar.bar,
      isActive: activeActivity === foobarName,
      onClick: () => action(foobarName),
      tooltipText: tooltipTexts.foobar,
    },
    {
      buttonType: 'secondary',
      children: 'Acheter un robot',
      disabled:
        context.foo < requirementsForARobot.foo || context.foobar < requirementsForARobot.foobar,
      isActive: activeActivity === robotName,
      onClick: () => action(robotName),
      tooltipText: tooltipTexts.robot,
    },
  ]
}

// Set timeBase to provide to LoadingBar depending on current activity timeBase
export const getLoadingBarTimeBase = (
  isMoving: boolean,
  activeActivity: ActivityType | undefined,
  barTimeBaseState: number,
): number | null => {
  if (isMoving) {
    return timeBases.moving
  } else if (activeActivity) {
    return activeActivity === 'bar' ? barTimeBaseState : timeBases[activeActivity]
  } else {
    return null
  }
}
