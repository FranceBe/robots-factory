type ResourceType = {
  foo: number
  bar: number
  foobar: number
  robot: number
}

export type ResultStatus = 'success' | 'failure' | undefined | null

export type RobotsResourceType = ResourceType & {
  buildFoobar: () => void
  incrementBar: () => void
  incrementFoo: () => void
  buyRobot: () => void
  resetContext: () => void
  resultStatus: ResultStatus
}
