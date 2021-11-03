import { ResultStatus } from 'contexts/robotsContext/robotContext'

// Function that returns a boolean
// Returns true 60% of the time to calculate the
// percent of chance the robot has to build a new foobar
export const hasFoobarSucceeded = (): ResultStatus => {
  const foobarTry = Math.round(Math.random() * 100)
  return foobarTry <= 60 ? 'success' : 'failure'
}
