import { TotalsContainer } from 'components/Totals/totals.style'
import { TotalsProps } from 'components/Totals/types/totals'
import React from 'react'

export const Totals: React.FC<TotalsProps> = ({ type = 'primary', total, label }) => {
  return (
    <TotalsContainer type={type}>
      <div>{label}</div>
      <div>{total}</div>
    </TotalsContainer>
  )
}

export default Totals
