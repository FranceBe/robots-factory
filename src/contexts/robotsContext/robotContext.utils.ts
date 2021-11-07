import { Status } from 'utils/common.enum'
import { buildFoobarChance } from 'utils/settings'
// Function that returns a boolean
// Returns true 60% of the time to calculate the
// percent of chance the robot has to build a new foobar
export const hasFoobarSucceeded = (): Status => {
  const foobarTry = Math.round(Math.random() * 100)
  return foobarTry <= buildFoobarChance ? Status.success : Status.failure
}
