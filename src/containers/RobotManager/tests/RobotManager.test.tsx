import '@testing-library/jest-dom/extend-expect'

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RobotManager } from 'containers/RobotManager'
import { RobotsContextProvider } from 'contexts/robotsContext'
import { ResourceType } from 'contexts/robotsContext/robotContext'
import { defaultRobotsResources } from 'contexts/robotsContext/robotsContext.variables'
import * as useActivityHook from 'hooks/useActivity'
import { ActivityType } from 'hooks/useActivity/useActivity'
import { nameByActivity } from 'hooks/useActivity/useActivity.variables'
import React from 'react'

describe('RobotManager Container', () => {
  let setContext: jest.Mock

  beforeEach(() => {
    jest.useFakeTimers()
    setContext = jest.fn()
    jest.spyOn(global.Math, 'random').mockReturnValue(0.01)
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  const initTest = (contextProps: ResourceType) =>
    render(
      <RobotsContextProvider {...contextProps}>
        <RobotManager robotId={'1'} />,
      </RobotsContextProvider>,
    )

  describe('Global rendering', () => {
    it('should render a RobotCard', () => {
      initTest(defaultRobotsResources)

      expect(screen.getByTestId('robot-card')).toBeInTheDocument()
      expect(screen.getByTestId('robot-manager')).toBeInTheDocument()
    })
    it('should render a robot icon with name using props robotId', () => {
      initTest(defaultRobotsResources)

      const icons = screen.getAllByRole('img', { hidden: true })

      expect(icons[0]).toBeInTheDocument()
      expect(icons[0]).toHaveClass('fa-robot')
      expect(screen.getByText(/Robot 1/)).toBeInTheDocument()
    })
    it('should render 4 Buttons with activity text', () => {
      initTest(defaultRobotsResources)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(4)
      expect(screen.getByText('Miner Foo')).toBeInTheDocument()
      expect(screen.getByText('Miner Bar')).toBeInTheDocument()
      expect(screen.getByText('Assembler Foobar')).toBeInTheDocument()
      expect(screen.getByText('Acheter un robot')).toBeInTheDocument()
    })
    it('should render a LoadingBar', () => {
      initTest(defaultRobotsResources)

      expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
    })
  })
  describe('Behaviour', () => {
    const casesCurrent: string[][] = [
      ['Miner Foo', 'Le robot est en train de miner du Foo. Cela prend 1s / Foo.'],
      ['Miner Bar', 'Le robot est en train de miner du Bar. Cela prend entre 0.5 et 2s / Bar.'],
      [
        'Assembler Foobar',
        "Le robot est en train d'assembler un Foobar. Cela prend 2s et a 60% de chance de succès.",
      ],
    ]
    it.each(casesCurrent)(
      'should display current message when %s button is clicked',
      (buttonName: string, message: string) => {
        initTest({ bar: 12, foo: 12, foobar: 12, robot: 2 })

        const button = screen.getByRole('button', { name: buttonName })

        userEvent.click(button)

        expect(screen.getByText(message)).toBeInTheDocument()

        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        // 1 robot at the start of the line, 1 robot in the current active button
        // And one spinner to show robot is current activity
        expect(icons).toHaveLength(3)
        expect(icons[0]).toHaveClass('fa-robot')
        expect(icons[1]).toHaveClass('fa-robot')
        expect(icons[2]).toHaveClass('fa-spinner')
      },
    )

    const casesSuccess: [string, string, number][] = [
      ['Miner Foo', "Le robot a fini d'assembler un Foo.", 1050],
      ['Miner Bar', "Le robot a fini d'assembler un Bar.", 550],
      ['Assembler Foobar', "Succès : Le robot a fini d'assembler un Foobar.", 2050],
      ['Acheter un robot', 'Succès : Le robot a acheté un nouveau robot.', 50],
    ]

    it.each(casesSuccess)(
      'should display success message and icon after %s activity is over',
      (buttonName: string, message: string, timeToFinish) => {
        initTest({ bar: 12, foo: 12, foobar: 12, robot: 2 })

        const button = screen.getByRole('button', { name: buttonName })

        userEvent.click(button)

        act(() => {
          // Advance time to be sure activity is done
          jest.advanceTimersByTime(timeToFinish)
        })

        expect(screen.getByText(message)).toBeInTheDocument()

        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        expect(icons[2]).toHaveClass('fa-check')
      },
    )

    const casesStartActivity: [string, ActivityType][] = [
      ['Miner Foo', nameByActivity.foo],
      ['Miner Bar', nameByActivity.bar],
      ['Assembler Foobar', nameByActivity.foobar],
      ['Acheter un robot', nameByActivity.robot],
    ]

    it.each(casesStartActivity)(
      'should call startActivity with corresponding activity when %s button is clicked',
      (buttonName: string, activityName: ActivityType) => {
        const startActivity = jest.fn()
        jest.spyOn(useActivityHook, 'useActivity').mockReturnValue({
          currentActivity: activityName,
          currentInfo: { iconInfo: undefined, textInfo: '' },
          startActivity,
          timeBase: 1,
          timeLeft: 0.1,
        })

        initTest({ bar: 12, foo: 12, foobar: 12, robot: 2 })

        const button = screen.getByRole('button', { name: buttonName })

        userEvent.click(button)

        expect(startActivity).toHaveBeenCalledTimes(1)
        expect(startActivity).toHaveBeenCalledWith(activityName, undefined)
      },
    )
  })
  it('should call startActivity with "moving" and a future activity when activity changes', () => {
    const startActivity = jest.fn()
    jest.spyOn(useActivityHook, 'useActivity').mockReturnValue({
      currentActivity: 'foo', // Robot is currently mining Foo
      currentInfo: { iconInfo: undefined, textInfo: '' },
      startActivity,
      timeBase: 1,
      timeLeft: 0.1,
    })
    initTest(defaultRobotsResources)
    // Robot is asked to mine Bar
    const button = screen.getByRole('button', { name: 'Miner Bar' })

    userEvent.click(button)

    expect(startActivity).toHaveBeenCalledTimes(1)
    expect(startActivity).toHaveBeenCalledWith('moving', 'bar')
  })
})
