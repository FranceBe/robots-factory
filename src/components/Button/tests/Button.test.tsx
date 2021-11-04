import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from 'components/Button'
import { ButtonProps } from 'components/Button/button'
import React from 'react'
import { palette } from 'styles/variables'
import { ThemeType } from 'utils/common.variables'

describe('Button component', () => {
  const initTest = (props?: ButtonProps) => render(<Button {...props}>Button text</Button>)

  describe('Common behaviour', () => {
    it('should match snapshot', () => {
      const { container } = initTest()
      expect(container.firstChild).toMatchSnapshot()
    })
    it('should have primary button style by default', () => {
      initTest()
      const button = screen.getByRole('button', { name: 'Button text' })

      expect(button).toHaveStyleRule('background-color', `${palette.pink_primary}`)
      expect(button).toHaveStyleRule('color', `${palette.white}`)
    })
    it('should display the button text', () => {
      initTest()

      expect(screen.getByText('Button text')).toBeInTheDocument()
    })
    it('should call provided function on click', () => {
      const mockedFn = jest.fn()
      initTest({ onClick: mockedFn })

      userEvent.click(screen.getByRole('button'))
      expect(mockedFn).toHaveBeenCalledTimes(1)
    })
    it('should not display a robot icon by default', () => {
      initTest()

      const robotIcon = screen.queryByRole('img', { hidden: true })
      expect(robotIcon).not.toBeInTheDocument()
    })
    it('should display a robot icon when button isActive', () => {
      initTest({ isActive: true })

      const robotIcon = screen.getByRole('img', { hidden: true })
      expect(robotIcon).toBeInTheDocument()
      expect(robotIcon).toHaveClass('fa-robot')
    })
    it('should display a tooltip when tooltipText is provided', async () => {
      initTest({ tooltipText: 'Tooltip text' })

      userEvent.hover(screen.getByTestId('button-container'))

      await waitFor(() => {
        expect(screen.getByText('Tooltip text')).toBeInTheDocument()
      })
    })
  })

  describe('Given buttonType is "primary"', () => {
    it('should have primary button style', () => {
      initTest({ buttonType: ThemeType.primary })
      const button = screen.getByRole('button', { name: 'Button text' })

      expect(button).toHaveStyleRule('background-color', `${palette.pink_primary}`)
      expect(button).toHaveStyleRule('color', `${palette.white}`)
      expect(button).toHaveStyleRule('background-color', `${palette.pink_tertiary}`, {
        modifier: ':hover',
      })
      expect(button).toHaveStyleRule('background-color', `${palette.pink_secondary}`, {
        modifier: ':disabled',
      })
      expect(button).toHaveStyleRule('color', `${palette.grey_quaternary}`, {
        modifier: ':disabled',
      })
    })
  })

  describe('Given buttonType is "secondary"', () => {
    it('should have secondary button style', () => {
      initTest({ buttonType: ThemeType.secondary })
      const button = screen.getByRole('button', { name: 'Button text' })

      expect(button).toHaveStyleRule('background-color', `${palette.blue_primary}`)
      expect(button).toHaveStyleRule('color', `${palette.white}`)
      expect(button).toHaveStyleRule('background-color', `${palette.blue_tertiary}`, {
        modifier: ':hover',
      })
      expect(button).toHaveStyleRule('background-color', `${palette.blue_secondary}`, {
        modifier: ':disabled',
      })
      expect(button).toHaveStyleRule('color', `${palette.grey_quaternary}`, {
        modifier: ':disabled',
      })
    })
  })
})
