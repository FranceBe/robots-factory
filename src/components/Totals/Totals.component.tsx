import { TotalsProps } from 'components/Totals/totals'
import { TotalsContainer } from 'components/Totals/totals.style'
import React from 'react'

export const Totals: React.FC<TotalsProps> = ({ type = 'primary', total, label }) => {
  return (
    <TotalsContainer type={type} className={'totals-component'} data-testid={'totals-component'}>
      <div>{label}</div>
      <div>{total}</div>
    </TotalsContainer>
  )
}

export default Totals
