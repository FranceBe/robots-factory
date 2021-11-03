import { Meta } from '@storybook/react/types-6-0'
import { Icon } from 'components/Icon'
import { Totals } from 'components/Totals'
import { TotalsProps } from 'components/Totals/totals'
import React from 'react'

export default {
  component: Totals,
  title: 'Components/Totals',
} as Meta

export const Primary: React.FC<TotalsProps> = () => (
  <>
    <Totals label={'Foo'} total={4} />
    <br />
    <Totals label={<Icon type={'robot'} />} total={4} />
  </>
)
export const Secondary: React.FC<TotalsProps> = () => (
  <>
    <Totals type={'secondary'} label={'Foo'} total={4} />
    <br />
    <Totals type={'secondary'} label={<Icon type={'robot'} />} total={4} />
  </>
)
