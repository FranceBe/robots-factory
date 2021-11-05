import { Status } from 'utils/common.variables'

// Function that returns a boolean
// Returns true 60% of the time to calculate the
// percent of chance the robot has to build a new foobar
export const hasFoobarSucceeded = (): Status => {
  const foobarTry = Math.round(Math.random() * 100)
  return foobarTry <= 60 ? Status.success : Status.failure
}
