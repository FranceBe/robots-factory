import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  it('should not display modal context nor button when context does not have 20 robots', () => {
    initTest(defaultContextValues)

    const modalButton = screen.queryByRole('button', { name: 'Fermer' })
    expect(screen.queryByText('Vous avez obtenu 20 robots . Bravo !')).not.toBeInTheDocument()
    expect(modalButton).not.toBeInTheDocument()
  })
  it('should display modal context nor button when context have 20 robots', () => {
    initTest({ ...defaultContextValues, robot: 20 })

    const modalButton = screen.getByRole('button', { name: 'Fermer' })
    expect(screen.getByText(/Vous avez obtenu/)).toBeInTheDocument()
    expect(screen.getByText('20 robots')).toBeInTheDocument()
    expect(screen.getByText(/. Bravo !/)).toBeInTheDocument()
    expect(screen.getByText('Le jeu est maintenant terminé.')).toBeInTheDocument()
    expect(
      screen.getByText('Le jeu a été remis à 0, vous pouvez fermer cette modale.'),
    ).toBeInTheDocument()
    expect(modalButton).toBeInTheDocument()
  })
  it('should reset context with its default value and close modal when modal button is clicked', () => {
    initTest({ ...defaultContextValues, robot: 20 })

    const modalButton = screen.getByRole('button', { name: 'Fermer' })

    userEvent.click(modalButton)

    expect(setContext).toHaveBeenCalledTimes(1)
    expect(setContext).toHaveBeenCalledWith(defaultContextValues)
    expect(screen.queryByRole('button', { name: 'Fermer' })).not.toBeInTheDocument()
  })
})
