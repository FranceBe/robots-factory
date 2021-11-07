import {
  requirementsForAFoobar,
  requirementsForARobot,
} from 'containers/RobotManager/robotManager.variables'
import { ActivityName } from 'utils/common.enum'

// Function that returns a boolean
// Depending on if the current context has enough resource
// To build a foobar or to buy a robot
export const hasEnoughResource = (
  resource: ActivityName | undefined,
  contextResource: number,
  target: ActivityName | undefined,
): boolean => {
  if (target && resource) {
    if (target === ActivityName.foobar) {
      return contextResource >= requirementsForAFoobar[resource]
    } else {
      return contextResource >= requirementsForARobot[resource]
    }
  } else return false
}
