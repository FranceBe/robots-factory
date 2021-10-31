import { GlobalContext } from 'hooks/globalContext'
import { defaultContextValues } from 'hooks/globalContext/globalContext.variables'
import Home from 'pages/Home'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'
import { GlobalStyle } from 'styles/global-styles'

const MainApp = () => {
  const [{ foo, bar, foobar, robot }, setContext] = useState(defaultContextValues)
  return (
    <GlobalContext.Provider value={{ bar, foo, foobar, robot, setContext }}>
      <Favicon url="https://image.flaticon.com/icons/png/512/65/65508.png" />
      <GlobalStyle />
      <Home />
    </GlobalContext.Provider>
  )
}

ReactDOM.render(<MainApp />, document.getElementById('root'))
