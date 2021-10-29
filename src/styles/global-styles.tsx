import { createGlobalStyle } from 'styled-components'
import { fontSizes, palette, spaces } from 'styles/variables'

import RobotoRegular from '../../static/assets/fonts/Roboto-Regular.ttf'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegular}) format('ttf');
    font-style: normal;
    font-weight: 400;
  }
  body {
    font-family: 'Roboto', sans-serif;
    font-size: ${fontSizes.regular};
    margin: ${spaces.medium};
    background-color: ${palette.grey_quaternary};
    color: ${palette.grey_primary};
  }
  
`
