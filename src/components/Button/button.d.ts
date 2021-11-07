import { ButtonHTMLAttributes } from 'react'
import { ThemeType } from 'utils/common.enum'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: ThemeType
  isActive?: boolean
  tooltipText?: string | JSX.Element
  uniqueIndex?: string
}
