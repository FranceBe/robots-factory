import { Icon } from 'components/Icon/Icon.component'
import { TotalsProps } from 'components/Totals/totals'
import { ResourceType } from 'contexts/robotsContext/robotContext'
import React from 'react'

// Function to get contents to display in TotalsGroup
// Depending on the current context
export const getTotalsFromContext = (context: ResourceType): TotalsProps[] => [
  { label: 'Foo', total: context.foo, type: 'primary' },
  { label: 'Bar', total: context.bar, type: 'primary' },
  { label: 'Foobar', total: context.foobar, type: 'primary' },
  { label: <Icon type={'robot'} />, total: context.robot, type: 'secondary' },
]

// Create an array of context.robot length
export const arrayFromContextRobotLength = (context: ResourceType): number[] =>
  Array.from(Array(context.robot).keys())