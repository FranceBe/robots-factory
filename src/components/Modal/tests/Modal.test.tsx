import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from 'components/Modal'
import { ModalProps } from 'components/Modal/types/modal'
import React from 'react'

describe('Modal component', () => {
  const onClickMock = jest.fn()
  const initTest = (props?: Partial<ModalProps>) =>
    render(
      <Modal
        isOpen={true}
        content={<p>Modal Content</p>}
        buttonText={'Click'}
        onButtonClick={onClickMock}
        {...props}
      />,
    )
  describe('Given modal is open', () => {
    it('should match snapshot', () => {
      const { container } = initTest()

      expect(container.firstChild).toMatchSnapshot()
    })
    it('should display content', () => {
      initTest()

      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })
    it('should display a button', () => {
      initTest()

      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Click')).toBeInTheDocument()
    })
    it('should call onClickMock when button is clicked', () => {
      initTest()

      const button = screen.getByRole('button')
      userEvent.click(button)

      expect(onClickMock).toHaveBeenCalledTimes(1)
    })
  })
  describe('Given modal is closed', () => {
    it('should not display content nor button', () => {
      initTest({ isOpen: false })

      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })
})
