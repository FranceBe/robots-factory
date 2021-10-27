import { createGlobalStyle } from 'styled-components'
import { palette } from 'styles/variables'

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
    margin: 1.5em;
    background-color: ${palette.grey_quaternary};
    color: ${palette.grey_primary};
  }
  
`
