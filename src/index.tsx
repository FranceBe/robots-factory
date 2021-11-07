import { RobotsContextProvider } from 'contexts/robotsContext'
import { Home } from 'pages/Home'
import React from 'react'
import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'
import { GlobalStyle } from 'styles/global-styles'

const MainApp = () => {
  return (
    <RobotsContextProvider>
      <Favicon url="https://image.flaticon.com/icons/png/512/65/65508.png" />
      <GlobalStyle />
      <Home />
    </RobotsContextProvider>
  )
}

ReactDOM.render(<MainApp />, document.getElementById('root'))
