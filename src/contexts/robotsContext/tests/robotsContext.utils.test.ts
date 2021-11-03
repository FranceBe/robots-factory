import { hasFoobarSucceeded } from 'contexts/robotsContext/robotContext.utils'

describe('hasFoobarSucceed', () => {
  it('should return "success" if random number (between 0 and 100) is 60 or less', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.593)
    // In the function, Math.random() * 100 and 0.593 * 100 = 59.3
    // then it's rounded so we get 59, and 59 <= 60 so it should return true
    const result = hasFoobarSucceeded()
    expect(result).toBe('success')
  })
  it('should return "failure if random number (between 0 and 100) is 61 or more', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.751)
    // In the function, Math.random() * 100 and 0.751 * 100 = 75.1
    // then it's rounded so we get 75, and 75 > 60 so it should return false
    const result = hasFoobarSucceeded()
    expect(result).toBe('failure')
  })
})
