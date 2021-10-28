import { TotalsProps } from 'components/Totals/types/totals'
import React from 'react'
import styled from 'styled-components'
import { fontSizes, palette, spaces } from 'styles/variables'

export const TotalsContainer = styled((props) => <div {...props} />)<Partial<TotalsProps>>`
  font-size: ${fontSizes.medium};
  color: ${palette.white};
  background-color: ${(props) =>
    props.type === 'primary' ? palette.pink_primary : palette.blue_primary};
  padding: ${spaces.small} ${spaces.regular};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${spaces.x_small};
`
