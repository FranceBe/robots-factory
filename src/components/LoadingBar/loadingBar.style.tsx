import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { fontSizes, palette, spaces } from 'styles/variables'

export const LoadingBarContainer = styled.div`
  height: ${spaces.medium};
  border-radius: ${spaces.x_small};
`
export const LoadingBarBackground = styled.div`
  background-color: ${palette.grey_tertiary};
  border-radius: ${spaces.x_small};
  display: flex;
  width: 100%;
  height: 100%;
`

export const TextContainer = styled.div`
  position: relative;
  top: -19px;
  left: 94%;
  font-size: ${fontSizes.small};
  z-index: 2;
  width: fit-content;
`

export const FilledBar = styled((props: PropsWithChildren<{ filled: number }>) => (
  <div {...props} />
))`
  background-color: ${palette.green_primary};
  width: ${(props) => `${props.filled}%`};
  border-bottom-left-radius: ${spaces.x_small};
  border-top-left-radius: ${spaces.x_small};
  border-bottom-right-radius: ${(props) => (props.filled === 100 ? spaces.x_small : 0)};
  border-top-right-radius: ${(props) => (props.filled === 100 ? spaces.x_small : 0)};
  height: 100%;
  transition: ${(props) => (props.filled === 0 ? 'none' : 'width 1s linear')};
`
