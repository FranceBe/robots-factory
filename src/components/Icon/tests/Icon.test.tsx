// Since we use FontAwesome icon, we assume the FontAwesome module
// is tested by itself. To test our Icon component, we will only
// test that it renders correctly with the corresponding FontAwesome icon
import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
import { Icon } from 'components/Icon'
import { IconProps } from 'components/Icon/types/icon'
import React from 'react'

describe('Icon component', () => {
  const initTest = (props: IconProps) => render(<Icon {...props} />)
  describe('Given type is "robot"', () => {
    it('should match snapshot', () => {
      const { container } = initTest({ type: 'robot' })
      expect(container.firstChild).toMatchSnapshot()
    })
    it('should render the FA robot icon', () => {
      initTest({ type: 'robot' })
      const robotIcon = screen.getByRole('img', { hidden: true })
      expect(robotIcon).toBeInTheDocument()
      expect(robotIcon).toHaveClass('fa-robot')
    })
  })
  describe('Given type is "spinner"', () => {
    it('should match snapshot', () => {
      const { container } = initTest({ type: 'spinner' })
      expect(container.firstChild).toMatchSnapshot()
    })
    it('should render the FA spinner icon', () => {
      initTest({ type: 'spinner' })
      const spinnerIcon = screen.getByRole('img', { hidden: true })
      expect(spinnerIcon).toBeInTheDocument()
      expect(spinnerIcon).toHaveClass('fa-spinner')
    })
  })
  describe('Given type is "failure"', () => {
    it('should match snapshot', () => {
      const { container } = initTest({ type: 'failure' })
      expect(container.firstChild).toMatchSnapshot()
    })
    it('should render the FA times icon', () => {
      initTest({ type: 'failure' })
      const failureIcon = screen.getByRole('img', { hidden: true })
      expect(failureIcon).toBeInTheDocument()
      expect(failureIcon).toHaveClass('fa-times')
    })
  })
  describe('Given type is "success"', () => {
    it('should match snapshot', () => {
      const { container } = initTest({ type: 'success' })
      expect(container.firstChild).toMatchSnapshot()
    })
    it('should render the FA check icon', () => {
      initTest({ type: 'success' })
      const successIcon = screen.getByRole('img', { hidden: true })
      expect(successIcon).toBeInTheDocument()
      expect(successIcon).toHaveClass('fa-check')
    })
  })
})
