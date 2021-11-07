import {
  requirementsForAFoobar,
  requirementsForARobot,
  tooltipTexts,
} from 'containers/RobotManager/robotManager.variables'

describe('RobotManager variables', () => {
  describe('requirementsForAFoobar', () => {
    it('should match snapshot', () => {
      expect(requirementsForAFoobar).toMatchSnapshot()
    })
  })
  describe('requirementsForARobot', () => {
    it('should match snapshot', () => {
      expect(requirementsForARobot).toMatchSnapshot()
    })
  })
  describe('tooltipTexts', () => {
    it('should match snapshot', () => {
      expect(tooltipTexts).toMatchSnapshot()
    })
  })
})
