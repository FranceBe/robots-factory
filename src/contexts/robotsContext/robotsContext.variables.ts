import { ResourceType, ResultStatus, RobotsResourceType } from 'contexts/robotsContext/robotContext'
import { Status } from 'utils/common.variables'

export const defaultRobotsResources: ResourceType = {
  bar: 0,
  foo: 0,
  foobar: 0,
  robot: 2,
}

export const defaultStatus: ResultStatus = {
  bar: Status.undone,
  foo: Status.undone,
  foobar: Status.undone,
  moving: Status.success,
  reset: Status.undone,
  robot: Status.undone,
}
// Create an initial context object to match and define types
export const initialRobotContext: RobotsResourceType = {
  ...defaultRobotsResources,
  buildFoobar: () => {
    // default buildFoobar
  },
  buyRobot: () => {
    // default buyRobot
  },
  incrementBar: () => {
    // default incrementBar
  },
  incrementFoo: () => {
    // default incrementFoo
  },
  resetContext: () => {
    // default resetContext
  },
  resultStatus: defaultStatus,
}
