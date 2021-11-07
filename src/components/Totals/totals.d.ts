import { ThemeType } from 'utils/common.enum'

export type TotalsProps = {
  type?: ThemeType
  label: string | JSX.Element
  total: number
}
