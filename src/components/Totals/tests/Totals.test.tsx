import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { render, screen } from '@testing-library/react'
import { Totals } from 'components/Totals'
import { TotalsProps } from 'components/Totals/totals'
import React from 'react'
import { palette } from 'styles/variables'
import { ThemeType } from 'utils/common.enum'

describe('Totals component', () => {
  const initTest = (props?: Partial<TotalsProps>) =>
    render(<Totals {...props} label={'Label'} total={10} />)

  describe('Common behaviour', () => {
    it('should match snapshot', () => {
      const { container } = initTest()

      expect(container.firstChild).toMatchSnapshot()
    })
    it('should have primary totals style by default', () => {
      const { container } = initTest()

      expect(container.firstChild).toHaveStyleRule('background-color', palette.pink_primary)
    })
    it('should display the label and the total as text', () => {
      initTest()

      expect(screen.getByText('Label')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })
  })

  describe('Given type is "primary"', () => {
    it('should have primary background color', () => {
      const { container } = initTest({ type: ThemeType.primary })

      expect(container.firstChild).toHaveStyleRule('background-color', palette.pink_primary)
    })
  })

  describe('Given type is "secondary"', () => {
    it('should have secondary background color', () => {
      const { container } = initTest({ type: ThemeType.secondary })

      expect(container.firstChild).toHaveStyleRule('background-color', palette.blue_primary)
    })
  })
})
