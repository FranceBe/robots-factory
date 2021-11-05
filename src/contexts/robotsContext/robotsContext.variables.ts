import { ResourceType, ResultStatus, RobotsResourceType } from 'contexts/robotsContext/robotContext'

export const defaultRobotsResources: ResourceType = {
  bar: 0,
  foo: 0,
  foobar: 0,
  robot: 2,
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
  resultStatus: undefined,
}

export const resultByStatus: Record<string, ResultStatus> = {
  failure: 'failure',
  reset: 'reset',
  success: 'success',
}
