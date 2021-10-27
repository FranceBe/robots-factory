import App from 'containers/App'
import React from 'react'
import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'
import { GlobalStyle } from 'styles/global-styles'

const MainApp = () => (
  <>
    <Favicon url="https://image.flaticon.com/icons/png/512/65/65508.png" />
    <GlobalStyle />
    <App />
  </>
)

ReactDOM.render(<MainApp />, document.getElementById('root'))
