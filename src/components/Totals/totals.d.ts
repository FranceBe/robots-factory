import { ThemeType } from 'utils/common.variables'

export type TotalsProps = {
  type?: ThemeType
  label: string | JSX.Element
  total: number
}
