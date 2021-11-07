import { emptyInfo, infoByActivity } from 'hooks/useActivity/useActivity.variables'

describe('useActivity variables', () => {
  describe('emptyInfo', () => {
    it('should match snapshot', () => {
      expect(emptyInfo).toMatchSnapshot()
    })
  })
  describe('infoByActivity', () => {
    it('should match snapshot', () => {
      expect(infoByActivity).toMatchSnapshot()
    })
  })
})
