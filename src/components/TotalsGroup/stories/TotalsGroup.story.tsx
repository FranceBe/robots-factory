import { Meta } from '@storybook/react/types-6-0'
import { Icon } from 'components/Icon'
import { TotalsProps } from 'components/Totals/totals'
import { TotalsGroup } from 'components/TotalsGroup'
import React from 'react'
import { ThemeType } from 'utils/common.variables'

export default {
  component: TotalsGroup,
  title: 'Components/TotalsGroup',
} as Meta

const content: TotalsProps[] = [
  { label: 'Foo', total: 4, type: ThemeType.primary },
  { label: 'Bar', total: 0, type: ThemeType.primary },
  { label: 'Foobar', total: 10, type: ThemeType.primary },
  { label: <Icon type={'robot'} />, total: 6, type: ThemeType.secondary },
]

export const Default: React.FC = () => <TotalsGroup content={content} />
