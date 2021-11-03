import { Button } from 'components/Button'
import { ModalProps } from 'components/Modal/modal'
import { ModalContent, modalStyle } from 'components/Modal/modal.style'
import React from 'react'
import ReactModal from 'react-modal'

export const Modal: React.FC<ModalProps> = ({ isOpen, content, buttonText, onButtonClick }) => {
  return (
    <ReactModal isOpen={isOpen} ariaHideApp={false} style={modalStyle}>
      <ModalContent>
        <div>{content}</div>
        <br />
        <Button buttonType={'secondary'} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </ModalContent>
    </ReactModal>
  )
}

export default Modal
