import {
  barName,
  foobarName,
  fooName,
  infosIcon,
  infosText,
  requirementsForAFoobar,
  requirementsForARobot,
  robotName,
  timeBases,
  tooltipTexts,
} from 'containers/RobotManager/robotManager.variables'

describe('RobotManager variables', () => {
  describe('barName', () => {
    it('should match snapshot', () => {
      expect(barName).toMatchSnapshot()
    })
  })
  describe('foobarName', () => {
    it('should match snapshot', () => {
      expect(foobarName).toMatchSnapshot()
    })
  })
  describe('fooName', () => {
    it('should match snapshot', () => {
      expect(fooName).toMatchSnapshot()
    })
  })
  describe('infosIcon', () => {
    it('should match snapshot', () => {
      expect(infosIcon).toMatchSnapshot()
    })
  })
  describe('infosText', () => {
    it('should match snapshot', () => {
      expect(infosText).toMatchSnapshot()
    })
  })
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
  describe('robotName', () => {
    it('should match snapshot', () => {
      expect(robotName).toMatchSnapshot()
    })
  })
  describe('timeBases', () => {
    it('should match snapshot', () => {
      expect(timeBases).toMatchSnapshot()
    })
  })
  describe('tooltipTexts', () => {
    it('should match snapshot', () => {
      expect(tooltipTexts).toMatchSnapshot()
    })
  })
})
