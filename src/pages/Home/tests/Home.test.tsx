import '@testing-library/jest-dom/extend-expect'

import { act, render, screen } from '@testing-library/react'
import { GlobalContext } from 'hooks/globalContext'
import { defaultContextValues } from 'hooks/globalContext/globalContext.variables'
import { ContextType } from 'hooks/types/globalContext'
import { Home } from 'pages/Home'
import React from 'react'

describe('Home page', () => {
  let setContext: jest.Mock

  beforeEach(() => {
    setContext = jest.fn()
  })

  const initTest = (contextProps: ContextType) =>
    render(
      <GlobalContext.Provider value={{ setContext, ...contextProps }}>
        <Home />
      </GlobalContext.Provider>,
    )
  it('should display page title', () => {
    initTest(defaultContextValues)

    expect(screen.getByText('Robots Factory')).toBeInTheDocument()
  })
  it('should display TotalsGroup and context values', () => {
    initTest(defaultContextValues)

    expect(screen.getByTestId('totals-group')).toBeInTheDocument()
    expect(screen.getAllByText('0')).toHaveLength(3) // foo, bar and foobar are set to 0 in defaultContextValues
    expect(screen.getByText('2')).toBeInTheDocument() // robot is set to 2 by default
  })
  it('should display as many RobotManager as there are robots in context', () => {
    initTest(defaultContextValues)

    expect(screen.getAllByTestId('robot-manager')).toHaveLength(defaultContextValues.robot)
  })
})
