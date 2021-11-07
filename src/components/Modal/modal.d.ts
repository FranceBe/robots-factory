import { ReactElement } from 'react'

export type ModalProps = {
  isOpen: boolean
  children: ReactElement
  buttonText: string
  onButtonClick: () => void
}
