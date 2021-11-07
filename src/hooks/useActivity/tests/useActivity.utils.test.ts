import { getBarTime } from 'hooks/useActivity/useActivity.utils'

describe('useActivity utils', () => {
  describe('getBarTime', () => {
    it('should return a number between 0.5 and 2', () => {
      const result = getBarTime()
      const isBetweenO5and2 = result >= 0.5 && result <= 2
      expect(isBetweenO5and2).toBe(true)
    })
    it('should round number provided by random method', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.6789)
      // first part of calculus is Math.random() * (2 - 0.5) + 0.5
      // and 0.6789 * (2 - 0.5) + 0.5 = 1.5183499999999999
      // Then 1.5183499999999999 is rounded to only get 1 digit after the .
      const result = getBarTime()
      expect(result).toBe(1.5)
    })
  })
})
