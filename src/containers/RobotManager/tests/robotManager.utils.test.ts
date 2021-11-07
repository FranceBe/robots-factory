import { hasEnoughResource } from 'containers/RobotManager/robotManager.utils'
import { ActivityName } from 'utils/common.enum'

describe('RobotManager utils', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })
  describe('hasEnoughResource', () => {
    it('should return true if contextResource >= required resource to build a foobar', () => {
      // A foobar needs 1 foo and 1 bar
      const resultFooFail = hasEnoughResource(ActivityName.foo, 0, ActivityName.foobar)
      expect(resultFooFail).toBe(false)

      const resultFooSuccess = hasEnoughResource(ActivityName.foo, 4, ActivityName.foobar)
      expect(resultFooSuccess).toBe(true)

      const resultBarFail = hasEnoughResource(ActivityName.bar, 0, ActivityName.foobar)
      expect(resultBarFail).toBe(false)

      const resultBarSuccess = hasEnoughResource(ActivityName.bar, 6, ActivityName.foobar)
      expect(resultBarSuccess).toBe(true)
    })
    it('should return true if contextResource >= required resource to buy a robot', () => {
      // A robot needs 6 foo and 3 foobar
      const resultFooFail = hasEnoughResource(ActivityName.foo, 4, ActivityName.robot)
      expect(resultFooFail).toBe(false)

      const resultFooSuccess = hasEnoughResource(ActivityName.foo, 7, ActivityName.robot)
      expect(resultFooSuccess).toBe(true)

      const resultFoobarFail = hasEnoughResource(ActivityName.foobar, 2, ActivityName.robot)
      expect(resultFoobarFail).toBe(false)

      const resultFoobarSuccess = hasEnoughResource(ActivityName.foobar, 4, ActivityName.robot)
      expect(resultFoobarSuccess).toBe(true)
    })
    it('should return false if resource is undefined', () => {
      const resultFooFail = hasEnoughResource(undefined, 4, ActivityName.robot)
      expect(resultFooFail).toBe(false)
    })
    it('should return false if target is undefined', () => {
      const resultFooFail = hasEnoughResource(ActivityName.foo, 4, undefined)
      expect(resultFooFail).toBe(false)
    })
  })
})
