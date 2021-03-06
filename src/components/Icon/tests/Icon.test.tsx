// Since I use FontAwesome icon, I assume the FontAwesome module
// is tested by itself. To test this Icon component, I will only
// test that it renders correctly with the corresponding FontAwesome icon
import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
import { FAIconByIconProps, Icon } from 'components/Icon'
import { IconProps } from 'components/Icon/icon'
import React from 'react'
import { IconEnum } from 'utils/common.enum'

describe('Icon component', () => {
  const initTest = (props?: IconProps) => render(<Icon {...props} />)
  describe('FAIconByIconProps', () => {
    it('should match snapshot', () => {
      expect(FAIconByIconProps).toMatchSnapshot()
    })
  })
  describe('Given no props is provided', () => {
    it('should render the FontAwesome robot icon by default', () => {
      initTest()
      const robotIcon = screen.getByRole('img', { hidden: true })
      expect(robotIcon).toBeInTheDocument()
      expect(robotIcon).toHaveClass('fa-robot')
    })
  })
  describe('Given type is "robot"', () => {
    it('should render the FontAwesome robot icon', () => {
      initTest({ type: IconEnum.robot })
      const robotIcon = screen.getByRole('img', { hidden: true })
      expect(robotIcon).toBeInTheDocument()
      expect(robotIcon).toHaveClass('fa-robot')
    })
  })
  describe('Given type is "spinner"', () => {
    it('should render the FontAwesome spinner icon', () => {
      initTest({ type: IconEnum.spinner })
      const spinnerIcon = screen.getByRole('img', { hidden: true })
      expect(spinnerIcon).toBeInTheDocument()
      expect(spinnerIcon).toHaveClass('fa-spinner')
    })
  })
  describe('Given type is "failure"', () => {
    it('should render the FontAwesome times icon', () => {
      initTest({ type: IconEnum.failure })
      const failureIcon = screen.getByRole('img', { hidden: true })
      expect(failureIcon).toBeInTheDocument()
      expect(failureIcon).toHaveClass('fa-times')
    })
  })
  describe('Given type is "success"', () => {
    it('should render the FontAwesome check icon', () => {
      initTest({ type: IconEnum.success })
      const successIcon = screen.getByRole('img', { hidden: true })
      expect(successIcon).toBeInTheDocument()
      expect(successIcon).toHaveClass('fa-check')
    })
  })
  describe('Given type is "moving"', () => {
    it('should render the FontAwesome check icon', () => {
      initTest({ type: IconEnum.moving })
      const successIcon = screen.getByRole('img', { hidden: true })
      expect(successIcon).toBeInTheDocument()
      expect(successIcon).toHaveClass('fa-route')
    })
  })
})
