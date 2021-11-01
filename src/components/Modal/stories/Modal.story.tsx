import { Meta } from '@storybook/react/types-6-0'
import { Modal } from 'components/Modal'
import { ModalProps } from 'components/Modal/types/modal'
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
      content={<p>Modal Content</p>}
      buttonText={'Click'}
      onButtonClick={() => console.log('click')}
    />
  )
}

export const ClickToOpen: React.FC<ModalProps> = () => {
  const [isOpen, setIsOpen] = useState('isOpen', false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  return (
    <>
      <button onClick={openModal}>Click to Open</button>
      <Modal
        isOpen={isOpen}
        content={<p>Modal Content</p>}
        buttonText={'Fermer'}
        onButtonClick={closeModal}
      />
    </>
  )
}
