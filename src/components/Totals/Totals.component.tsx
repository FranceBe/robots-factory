import { TotalsProps } from 'components/Totals/totals'
import { TotalsContainer } from 'components/Totals/totals.style'
import React from 'react'
import { ThemeType } from 'utils/common.variables'

export const Totals: React.FC<TotalsProps> = ({ type = ThemeType.primary, total, label }) => {
  return (
    <TotalsContainer type={type} className={'totals-component'} data-testid={'totals-component'}>
      <div>{label}</div>
      <div>{total}</div>
    </TotalsContainer>
  )
}

export default Totals
