import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RobotsContext } from 'contexts/robotsContext'
import { ResourceType } from 'contexts/robotsContext/robotContext'
import {
  defaultRobotsResources,
  initialRobotContext,
} from 'contexts/robotsContext/robotsContext.variables'
import { Home } from 'pages/Home'
import React from 'react'

describe('Home page', () => {
  let resetContext: jest.Mock

  beforeEach(() => {
    resetContext = jest.fn()
  })

  const initTest = (contextProps: ResourceType) =>
    render(
      <RobotsContext.Provider value={{ ...initialRobotContext, resetContext, ...contextProps }}>
        <Home />
      </RobotsContext.Provider>,
    )
  it('should display page title', () => {
    initTest(defaultRobotsResources)

    expect(screen.getByText('Robots Factory')).toBeInTheDocument()
  })
  it('should display TotalsGroup and context values', () => {
    initTest(defaultRobotsResources)

    expect(screen.getByTestId('totals-group')).toBeInTheDocument()
    expect(screen.getAllByText('0')).toHaveLength(3) // foo, bar and foobar are set to 0 in defaultRobotsResources
    expect(screen.getByText('2')).toBeInTheDocument() // robot is set to 2 by default
  })
  it('should display as many RobotManager as there are robots in context', () => {
    initTest(defaultRobotsResources)

    expect(screen.getAllByTestId('robot-manager')).toHaveLength(defaultRobotsResources.robot)
  })
  it('should not display modal context nor button when context does not have 20 robots', () => {
    initTest(defaultRobotsResources)

    const modalButton = screen.queryByRole('button', { name: 'Fermer' })
    expect(screen.queryByText('Vous avez obtenu 20 robots . Bravo !')).not.toBeInTheDocument()
    expect(modalButton).not.toBeInTheDocument()
  })
  it('should display modal context nor button when context have 20 robots', () => {
    initTest({ ...defaultRobotsResources, robot: 20 })

    const modalButton = screen.getByRole('button', { name: 'Fermer' })
    expect(screen.getByText(/Vous avez obtenu/)).toBeInTheDocument()
    expect(screen.getByText('20 robots')).toBeInTheDocument()
    expect(screen.getByText(/. Bravo !/)).toBeInTheDocument()
    expect(screen.getByText('Le jeu est maintenant terminé.')).toBeInTheDocument()
    expect(screen.getByText('En cliquand sur "Fermer", le jeu sera remis à 0.')).toBeInTheDocument()
    expect(modalButton).toBeInTheDocument()
  })
  it('should reset context with its default value and close modal when modal button is clicked', () => {
    initTest({ ...defaultRobotsResources, robot: 20 })

    const modalButton = screen.getByRole('button', { name: 'Fermer' })

    userEvent.click(modalButton)

    expect(resetContext).toHaveBeenCalledTimes(1)
    expect(resetContext).toHaveBeenCalledWith()
    expect(screen.queryByRole('button', { name: 'Fermer' })).not.toBeInTheDocument()
  })
})
