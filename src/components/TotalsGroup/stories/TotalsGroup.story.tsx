import { Meta } from '@storybook/react/types-6-0'
import { TotalsGroup } from 'components/TotalsGroup'
import { ResourceType } from 'contexts/robotsContext/robotContext'
import React from 'react'

export default {
  component: TotalsGroup,
  title: 'Components/TotalsGroup',
} as Meta

const totals: ResourceType = {
  bar: 0,
  foo: 4,
  foobar: 10,
  robot: 6,
}

export const Default: React.FC = () => <TotalsGroup totals={totals} />
