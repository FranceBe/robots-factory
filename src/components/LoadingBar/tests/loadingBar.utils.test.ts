import { getFilledBarWidth } from 'components/LoadingBar/loadingBar.utils'

describe('LoadingBar utils', () => {
  describe('getFilledBarWidth', () => {
    const cases: number[][] = [
      [2, 98.18],
      [13, 88.18],
      [60, 45.45],
      [30, 72.73],
      [110, 0],
    ]
    it.each(cases)(
      'should return the percent of 110 - %d',
      (timeLeft: number, expected: number) => {
        const result = getFilledBarWidth(timeLeft, 110)
        expect(result).toBe(expected)
      },
    )
  })
  it('should return 100 if timeLeft is > timeBase', () => {
    const result = getFilledBarWidth(110, 100)
    expect(result).toBe(100)
  })
  it('should return 0 if timeLeft is < 0', () => {
    const result = getFilledBarWidth(-1, 100)
    expect(result).toBe(0)
  })
})
