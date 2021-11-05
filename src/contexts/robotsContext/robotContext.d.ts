import { Status } from 'utils/common.variables'

type ResourceType = {
  foo: number
  bar: number
  foobar: number
  robot: number
}

export type ResultStatus = {
  foo: Status
  bar: Status
  foobar: Status
  robot: Status
  reset: Status
  moving: Status
}

export type RobotsResourceType = ResourceType & {
  buildFoobar: () => void
  incrementBar: () => void
  incrementFoo: () => void
  buyRobot: () => void
  resetContext: () => void
  resultStatus: ResultStatus
}
