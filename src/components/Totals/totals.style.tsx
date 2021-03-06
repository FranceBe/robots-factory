import { TotalsProps } from 'components/Totals/totals'
import React from 'react'
import styled from 'styled-components'
import { fontSizes, palette, spaces } from 'styles/variables'
import { ThemeType } from 'utils/common.enum'

export const TotalsContainer = styled((props) => <div {...props} />)<Partial<TotalsProps>>`
  font-size: ${fontSizes.medium};
  color: ${palette.white};
  background-color: ${(props) =>
    props.type === ThemeType.primary ? palette.pink_primary : palette.blue_primary};
  padding: ${spaces.small} ${spaces.regular};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${spaces.x_small};
`
