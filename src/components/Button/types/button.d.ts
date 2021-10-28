import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: 'primary' | 'secondary'
  isActive?: boolean
  tooltipText?: string | JSX.Element
  uniqueIndex?: string
}
