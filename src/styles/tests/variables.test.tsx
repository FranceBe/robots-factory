import { fontSizes, palette, spaces } from 'styles/variables'

describe('variables', () => {
  describe('palette', () => {
    it('should match snapshot', () => {
      expect(palette).toMatchSnapshot()
    })
  })
  describe('fontSizes', () => {
    it('should match snapshot', () => {
      expect(fontSizes).toMatchSnapshot()
    })
  })
  describe('spaces', () => {
    it('should match snapshot', () => {
      expect(spaces).toMatchSnapshot()
    })
  })
})
