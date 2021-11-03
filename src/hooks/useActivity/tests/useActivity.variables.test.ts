import {
  emptyInfo,
  infoByActivity,
  nameByActivity,
  statusTimer,
  timeBaseByActivity,
} from 'hooks/useActivity/useActivity.variables'

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
  describe('nameByActivity', () => {
    it('should match snapshot', () => {
      expect(nameByActivity).toMatchSnapshot()
    })
  })
  describe('timeBaseByActivity', () => {
    it('should match snapshot', () => {
      expect(timeBaseByActivity).toMatchSnapshot()
    })
  })
  describe('statusTimer', () => {
    it('should match snapshot', () => {
      expect(statusTimer).toMatchSnapshot()
    })
  })
})