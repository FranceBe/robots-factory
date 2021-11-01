import { ReactElement } from 'react'

export type ModalProps = {
  isOpen: boolean
  content: string | ReactElement
  buttonText: string
  onButtonClick: () => void
}
