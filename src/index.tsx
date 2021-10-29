import { GlobalContext } from 'hooks/GlobalContext'
import { defaultContextValues } from 'hooks/GlobalContext/globalContext.variables'
import Home from 'pages/Home'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'
import { GlobalStyle } from 'styles/global-styles'

const MainApp = () => {
  const [{ foo, bar, foobar, robots }, setContext] = useState(defaultContextValues)
  return (
    <GlobalContext.Provider value={{ bar, foo, foobar, robots, setContext }}>
      <Favicon url="https://image.flaticon.com/icons/png/512/65/65508.png" />
      <GlobalStyle />
      <Home />
    </GlobalContext.Provider>
  )
}

ReactDOM.render(<MainApp />, document.getElementById('root'))
