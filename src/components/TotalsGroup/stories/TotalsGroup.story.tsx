import { Meta } from '@storybook/react/types-6-0'
import { Icon } from 'components/Icon'
import { TotalsProps } from 'components/Totals/totals'
import { TotalsGroup } from 'components/TotalsGroup'
import React from 'react'
import styled from 'styled-components'

const ScrollableStory = styled.div`
  height: 2000px;
`
export default {
  component: TotalsGroup,
  title: 'Components/TotalsGroup',
} as Meta

const content: TotalsProps[] = [
  { label: 'Foo', total: 4, type: 'primary' },
  { label: 'Bar', total: 0, type: 'primary' },
  { label: 'Foobar', total: 10, type: 'primary' },
  { label: <Icon type={'robot'} />, total: 6, type: 'secondary' },
]

export const Default: React.FC = () => (
  <ScrollableStory>
    <TotalsGroup content={content} />
  </ScrollableStory>
)
