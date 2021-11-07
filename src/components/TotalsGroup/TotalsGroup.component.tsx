// Totals group component is a list of all the totals needed for the games
import { Icon } from 'components/Icon'
import { Totals } from 'components/Totals'
import { CardContainer } from 'components/TotalsGroup/totalsGroup.style'
import { ResourceType } from 'contexts/robotsContext/robotContext'
import React from 'react'
import { IconEnum, ThemeType } from 'utils/common.enum'

export const TotalsGroup: React.FC<{ totals: ResourceType }> = ({ totals }) => {
  return (
    <CardContainer data-testid={'totals-group'}>
      <Totals label={'Foo'} total={totals.foo} type={ThemeType.primary} />
      <Totals label={'Bar'} total={totals.bar} type={ThemeType.primary} />
      <Totals label={'Foobar'} total={totals.foobar} type={ThemeType.primary} />
      <Totals
        label={<Icon type={IconEnum.robot} />}
        total={totals.robot}
        type={ThemeType.secondary}
      />
    </CardContainer>
  )
}

export default TotalsGroup
