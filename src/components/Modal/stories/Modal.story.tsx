import { Meta } from '@storybook/react/types-6-0'
import { Modal } from 'components/Modal'
import { ModalProps } from 'components/Modal/modal'
import React from 'react'
import useState from 'storybook-addon-state'

export default {
  component: Modal,
  title: 'Components/Modal',
} as Meta

export const Open: React.FC<ModalProps> = () => {
  return (
    <Modal
      isOpen={true}
      buttonText={'Click'}
      onButtonClick={() => {
        // onButtonClick
      }}
    >
      <p>Modal Content</p>
    </Modal>
  )
}

export const ClickToOpen: React.FC<ModalProps> = () => {
  const [isOpen, setIsOpen] = useState('isOpen', false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  return (
    <>
      <button onClick={openModal}>Click to Open</button>
      <Modal isOpen={isOpen} buttonText={'Fermer'} onButtonClick={closeModal}>
        <p>Modal Content</p>
      </Modal>
    </>
  )
}
