import { ButtonProps } from 'components/Button/button'
import React from 'react'
import styled from 'styled-components'
import { fontSizes, palette, spaces } from 'styles/variables'
import { ThemeType } from 'utils/common.variables'

export const ButtonContainer = styled((props) => <button {...props} />)<ButtonProps>`
  height: ${spaces.xx_large};
  border: none;
  background-color: ${(props) =>
    props.buttontype === ThemeType.primary ? palette.pink_primary : palette.blue_primary};
  padding: ${spaces.small};
  color: ${palette.white};
  font-size: ${fontSizes.regular};
  border-radius: ${spaces.x_small};
  cursor: pointer;
  min-width: 184px;
  :hover {
    background-color: ${(props) =>
      props.buttontype === ThemeType.primary ? palette.pink_tertiary : palette.blue_tertiary};
  }
  :disabled,
  :disabled:hover {
    color: ${palette.grey_quaternary};
    background-color: ${(props) =>
      props.buttontype === ThemeType.primary ? palette.pink_secondary : palette.blue_secondary};
    cursor: not-allowed;
  }
  svg {
    position: relative;
    bottom: 15px;
    left: 75px;
    filter: drop-shadow(0 0 ${spaces.x_small} ${palette.grey_primary});
  }
`
export const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
