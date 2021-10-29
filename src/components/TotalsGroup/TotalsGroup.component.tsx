import { Totals } from 'components/Totals'
import { TotalsProps } from 'components/Totals/types/totals'
import { CardContainer } from 'components/TotalsGroup/totalsGroup.style'
import React from 'react'

export const TotalsGroup: React.FC<{ content: TotalsProps[] }> = ({ content }) => {
  return (
    <CardContainer>
      {content &&
        content.map((item) => (
          <Totals key={`${item.label}`} label={item.label} total={item.total} type={item.type} />
        ))}
    </CardContainer>
  )
}

export default TotalsGroup
