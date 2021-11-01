import '@testing-library/jest-dom/extend-expect'

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RobotManager } from 'containers/RobotManager'
import { GlobalContext } from 'hooks/globalContext'
import { defaultContextValues } from 'hooks/globalContext/globalContext.variables'
import { ContextType } from 'hooks/types/globalContext'
import * as useTimeHook from 'hooks/useTimer'
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

  const initTest = (contextProps: ContextType) =>
    render(
      <GlobalContext.Provider value={{ setContext, ...contextProps }}>
        <RobotManager robotId={1} />
      </GlobalContext.Provider>,
    )

  describe('Global rendering', () => {
    it('should render a RobotCard', () => {
      initTest(defaultContextValues)

      expect(screen.getByTestId('robot-card')).toBeInTheDocument()
      expect(screen.getByTestId('robot-manager')).toBeInTheDocument()
    })
    it('should render a robot icon with name using props robotId', () => {
      initTest(defaultContextValues)

      const icons = screen.getAllByRole('img', { hidden: true })

      expect(icons[0]).toBeInTheDocument()
      expect(icons[0]).toHaveClass('fa-robot')
      expect(screen.getByText(/Robot 1/)).toBeInTheDocument()
    })
    it('should render 4 Buttons with activity text', () => {
      initTest(defaultContextValues)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(4)
      expect(screen.getByText('Miner Foo')).toBeInTheDocument()
      expect(screen.getByText('Miner Bar')).toBeInTheDocument()
      expect(screen.getByText('Assembler Foobar')).toBeInTheDocument()
      expect(screen.getByText('Acheter un robot')).toBeInTheDocument()
    })
    it('should render a LoadingBar', () => {
      initTest(defaultContextValues)

      expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
    })
  })
  describe('Behaviour', () => {
    describe('Given "Miner Foo" button has been clicked', () => {
      it('should display the mining info and icon', () => {
        initTest(defaultContextValues)

        const mineFooButton = screen.getByRole('button', { name: 'Miner Foo' })

        userEvent.click(mineFooButton)

        expect(
          screen.getByText('Le robot est en train de miner du Foo. Cela prend 1s / Foo.'),
        ).toBeInTheDocument()

        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        // 1 robot at the start of the line, 1 robot in the current active button
        // And one spinner to show robot is currently mining
        expect(icons).toHaveLength(3)
        expect(icons[0]).toHaveClass('fa-robot')
        expect(icons[1]).toHaveClass('fa-robot')
        expect(icons[2]).toHaveClass('fa-spinner')
      })
      it('should display the success mining & icon after 1 sec', () => {
        initTest(defaultContextValues)

        const mineFooButton = screen.getByRole('button', { name: 'Miner Foo' })

        userEvent.click(mineFooButton)

        act(() => {
          // Advance time just a little more than 1 sec to be sure activity is done
          jest.advanceTimersByTime(1050)
        })

        expect(screen.getByText("Le robot a fini d'assembler un Foo.")).toBeInTheDocument()

        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        // 1 robot at the start of the line, 1 robot in the current active button
        // And one check to show robot has finished mining
        expect(icons).toHaveLength(3)
        expect(icons[0]).toHaveClass('fa-robot')
        expect(icons[1]).toHaveClass('fa-robot')
        expect(icons[2]).toHaveClass('fa-check')
      })
      it('should call setContext by adding a foo to the global context when done', () => {
        initTest(defaultContextValues)

        const mineFooButton = screen.getByRole('button', { name: 'Miner Foo' })

        userEvent.click(mineFooButton)

        act(() => {
          // Advance time just a little more than 1 sec to be sure activity is done
          jest.advanceTimersByTime(1050)
        })
        expect(setContext).toHaveBeenCalledTimes(1)
        expect(setContext).toHaveBeenCalledWith({
          ...defaultContextValues,
          foo: defaultContextValues.foo + 1,
        })
      })
      it('should call hook startCounter with foo timeBase (1s)', () => {
        const startCounter = jest.fn()
        const stopCounter = jest.fn()
        jest.spyOn(useTimeHook, 'useTimer').mockReturnValue({
          startCounter,
          status: 'done',
          stopCounter,
          timeLeft: 0,
        })
        initTest(defaultContextValues)

        const mineFooButton = screen.getByRole('button', { name: 'Miner Foo' })

        userEvent.click(mineFooButton)

        act(() => {
          // Advance time just a little more than 1 sec to be sure activity is done
          jest.advanceTimersByTime(1050)
        })

        expect(startCounter).toHaveBeenCalledTimes(1)
        expect(startCounter).toHaveBeenCalledWith(1)
      })
    })
    describe('Given "Miner Bar" button has been clicked', () => {
      it('should display the mining info and icon', () => {
        initTest(defaultContextValues)

        const mineBarButton = screen.getByRole('button', { name: 'Miner Bar' })

        userEvent.click(mineBarButton)

        expect(
          screen.getByText(
            'Le robot est en train de miner du Bar. Cela prend entre 0.5 et 2s / Bar.',
          ),
        ).toBeInTheDocument()

        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        // 1 robot at the start of the line, 1 robot in the current active button
        // And one spinner to show robot is currently mining
        expect(icons).toHaveLength(3)
        expect(icons[0]).toHaveClass('fa-robot')
        expect(icons[1]).toHaveClass('fa-robot')
        expect(icons[2]).toHaveClass('fa-spinner')
      })
      it('should display the success mining & icon after activity is done', () => {
        initTest(defaultContextValues)

        const mineBarButton = screen.getByRole('button', { name: 'Miner Bar' })

        userEvent.click(mineBarButton)

        act(() => {
          // In this test, we mocked Math.random to return 0.01
          // So the barTime is calculated Math.round((Math.random() * (2 - 0.5) + 0.5) * 10) / 10
          // 0.01 * (2 - 0.5) + 0.5 = 0.515, then with the Math.round, we got 0.5s
          // Advance time just a little more than 0.5s sec to be sure activity is done
          jest.advanceTimersByTime(550)
        })

        expect(screen.getByText("Le robot a fini d'assembler un Bar.")).toBeInTheDocument()

        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        // 1 robot at the start of the line, 1 robot in the current active button
        // And one check to show robot has finished mining
        expect(icons).toHaveLength(3)
        expect(icons[0]).toHaveClass('fa-robot')
        expect(icons[1]).toHaveClass('fa-robot')
        expect(icons[2]).toHaveClass('fa-check')
      })
      it('should call setContext by adding a bar to the global context when done', () => {
        initTest(defaultContextValues)

        const mineBarButton = screen.getByRole('button', { name: 'Miner Bar' })

        userEvent.click(mineBarButton)

        act(() => {
          // Advance time just a little more than 0.5s sec to be sure activity is done
          jest.advanceTimersByTime(550)
        })
        expect(setContext).toHaveBeenCalledTimes(1)
        expect(setContext).toHaveBeenCalledWith({
          ...defaultContextValues,
          bar: defaultContextValues.bar + 1,
        })
      })
      it('should call hook startCounter with bar timeBase (0.5s)', () => {
        const startCounter = jest.fn()
        jest.spyOn(useTimeHook, 'useTimer').mockReturnValue({
          startCounter,
          status: 'done',
          stopCounter: jest.fn(),
          timeLeft: 0,
        })
        initTest(defaultContextValues)

        const mineBarButton = screen.getByRole('button', { name: 'Miner Bar' })

        userEvent.click(mineBarButton)

        act(() => {
          // Advance time just a little more than 0.5s sec to be sure activity is done
          jest.advanceTimersByTime(550)
        })

        expect(startCounter).toHaveBeenCalledTimes(1)
        expect(startCounter).toHaveBeenCalledWith(0.5)
      })
    })
    describe('Given "Assembler Foobar" button has been clicked', () => {
      const newContext = {
        ...defaultContextValues,
        bar: 1,
        foo: 1,
      }
      it('should not display text nor call startCounter if there is not enough foo', () => {
        const startCounter = jest.fn()
        jest.spyOn(useTimeHook, 'useTimer').mockReturnValue({
          startCounter,
          status: 'done',
          stopCounter: jest.fn(),
          timeLeft: 0,
        })
        const newContextMissingFoo = {
          ...defaultContextValues,
          bar: 1,
          foo: 0, // 1 foo and 1 bar is needed to click on the build foobar button
        }
        initTest(newContextMissingFoo)

        const buildFoobarButton = screen.getByRole('button', { name: 'Assembler Foobar' })

        userEvent.click(buildFoobarButton)

        expect(
          screen.queryByText(
            "Le robot est en train d'assembler un Foobar. Cela prend 2s et a 60% de chance de succès.",
          ),
        ).not.toBeInTheDocument()
        expect(startCounter).toHaveBeenCalledTimes(0)
      })
      it('should not display text nor call startCounter if there is not enough bar', () => {
        const startCounter = jest.fn()
        jest.spyOn(useTimeHook, 'useTimer').mockReturnValue({
          startCounter,
          status: 'done',
          stopCounter: jest.fn(),
          timeLeft: 0,
        })
        const newContextMissingBar = {
          ...defaultContextValues,
          bar: 0, // 1 foo and 1 bar is needed to click on the build foobar button
          foo: 1,
        }
        initTest(newContextMissingBar)

        const buildFoobarButton = screen.getByRole('button', { name: 'Assembler Foobar' })

        userEvent.click(buildFoobarButton)

        expect(
          screen.queryByText(
            "Le robot est en train d'assembler un Foobar. Cela prend 2s et a 60% de chance de succès.",
          ),
        ).not.toBeInTheDocument()
        expect(startCounter).toHaveBeenCalledTimes(0)
      })
      it('should display the building info and icon if there is enough resources', () => {
        initTest(newContext)

        const buildFoobarButton = screen.getByRole('button', { name: 'Assembler Foobar' })

        userEvent.click(buildFoobarButton)

        expect(
          screen.getByText(
            "Le robot est en train d'assembler un Foobar. Cela prend 2s et a 60% de chance de succès.",
          ),
        ).toBeInTheDocument()

        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        // 1 robot at the start of the line, 1 robot in the current active button
        // And one spinner to show robot is currently building
        expect(icons).toHaveLength(3)
        expect(icons[0]).toHaveClass('fa-robot')
        expect(icons[1]).toHaveClass('fa-robot')
        expect(icons[2]).toHaveClass('fa-spinner')
      })
      it('should display the success mining & icon after activity is done if building has succeeded', () => {
        initTest(newContext)

        const buildFoobarButton = screen.getByRole('button', { name: 'Assembler Foobar' })

        userEvent.click(buildFoobarButton)

        act(() => {
          // Advance time just a little more than 2s sec to be sure activity is done
          jest.advanceTimersByTime(2050)
        })

        expect(
          screen.getByText("Succès : Le robot a fini d'assembler un Foobar."),
        ).toBeInTheDocument()

        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        // 1 robot at the start of the line, 1 robot in the current active button
        // And one check to show robot has finished building
        expect(icons).toHaveLength(3)
        expect(icons[0]).toHaveClass('fa-robot')
        expect(icons[1]).toHaveClass('fa-robot')
        expect(icons[2]).toHaveClass('fa-check')
      })
      it('should call setContext by adding a foobar and removing 1 foo & 1 bar to the global context when it succeeded', () => {
        initTest(newContext)

        const buildFoobarButton = screen.getByRole('button', { name: 'Assembler Foobar' })

        userEvent.click(buildFoobarButton)

        act(() => {
          // Advance time just a little more than 2s sec to be sure activity is done
          jest.advanceTimersByTime(2050)
        })

        expect(setContext).toHaveBeenCalledTimes(1)
        expect(setContext).toHaveBeenCalledWith({
          ...newContext,
          bar: newContext.bar - 1,
          foo: newContext.foo - 1,
          foobar: newContext.foobar + 1,
        })
      })
      it('should call hook startCounter with foobar timeBase (2s)', () => {
        const startCounter = jest.fn()
        jest.spyOn(useTimeHook, 'useTimer').mockReturnValue({
          startCounter,
          status: 'done',
          stopCounter: jest.fn(),
          timeLeft: 0,
        })

        initTest(newContext)

        const buildFoobarButton = screen.getByRole('button', { name: 'Assembler Foobar' })

        userEvent.click(buildFoobarButton)

        act(() => {
          // Advance time just a little more than 2s sec to be sure activity is done
          jest.advanceTimersByTime(2050)
        })

        expect(startCounter).toHaveBeenCalledTimes(1)
        expect(startCounter).toHaveBeenCalledWith(2)
      })
      it('should display failure info and icon after activity is done if building failed', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8)

        initTest(newContext)

        const buildFoobarButton = screen.getByRole('button', { name: 'Assembler Foobar' })

        userEvent.click(buildFoobarButton)

        act(() => {
          // Advance time just a little more than 2s sec to be sure activity is done
          jest.advanceTimersByTime(2050)
        })

        // In this test we mocked Math.random to return 0.8
        // The building try is calculated from Math.round(Math.random() * 100)
        // 0.8 * 100 = 80, and 80 > 60 so it failed
        expect(
          screen.getByText(
            "Echec : Le robot n'a pas assemblé de Foobar, le Bar a pu être sauvé mais le Foo est perdu.",
          ),
        ).toBeInTheDocument()

        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        // 1 robot at the start of the line, 1 robot in the current active button
        // And one check to show robot has failed building
        expect(icons).toHaveLength(3)
        expect(icons[0]).toHaveClass('fa-robot')
        expect(icons[1]).toHaveClass('fa-robot')
        expect(icons[2]).toHaveClass('fa-times')
      })
      it('should call setContext by removing 1 foo to the global context when building failed', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8)

        initTest(newContext)

        const buildFoobarButton = screen.getByRole('button', { name: 'Assembler Foobar' })

        userEvent.click(buildFoobarButton)

        act(() => {
          // Advance time just a little more than 2s sec to be sure activity is done
          jest.advanceTimersByTime(2050)
        })

        expect(setContext).toHaveBeenCalledTimes(1)
        expect(setContext).toHaveBeenCalledWith({
          ...newContext,
          bar: newContext.bar,
          foo: newContext.foo - 1,
          foobar: newContext.foobar,
        })
      })
    })
    describe('Given "Acheter un robot" button has been clicked', () => {
      const newContext = {
        ...defaultContextValues,
        foo: 6,
        foobar: 3,
      }
      it('should not display text nor call startCounter if there is not enough foo', () => {
        const startCounter = jest.fn()
        jest.spyOn(useTimeHook, 'useTimer').mockReturnValue({
          startCounter,
          status: 'done',
          stopCounter: jest.fn(),
          timeLeft: 0,
        })
        const newContextMissingFoo = {
          ...defaultContextValues,
          foo: 4, // 6 foo and 3 foobar is needed to click on the buy robot button
          foobar: 3,
        }
        initTest(newContextMissingFoo)

        const buyRobotButton = screen.getByRole('button', { name: 'Acheter un robot' })

        userEvent.click(buyRobotButton)

        expect(
          screen.queryByText('Succès : Le robot a acheté un nouveau robot.'),
        ).not.toBeInTheDocument()
        expect(startCounter).toHaveBeenCalledTimes(0)
      })
      it('should not display text nor call startCounter if there is not enough foobar', () => {
        const startCounter = jest.fn()
        jest.spyOn(useTimeHook, 'useTimer').mockReturnValue({
          startCounter,
          status: 'done',
          stopCounter: jest.fn(),
          timeLeft: 0,
        })
        const newContextMissingFoobar = {
          ...defaultContextValues,
          foo: 6,
          foobar: 2, // 6 foo and 3 foobar is needed to click on the buy robot button
        }
        initTest(newContextMissingFoobar)

        const buyRobotButton = screen.getByRole('button', { name: 'Acheter un robot' })

        userEvent.click(buyRobotButton)

        expect(
          screen.queryByText('Succès : Le robot a acheté un nouveau robot.'),
        ).not.toBeInTheDocument()
        expect(startCounter).toHaveBeenCalledTimes(0)
      })
      it('should display the success info and icon if there is enough resources', () => {
        initTest(newContext)

        const buyRobotButton = screen.getByRole('button', { name: 'Acheter un robot' })

        userEvent.click(buyRobotButton)

        expect(screen.getByText('Succès : Le robot a acheté un nouveau robot.')).toBeInTheDocument()

        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        // 1 robot at the start of the line, 1 robot in the current active button
        // And one spinner to show robot is has finished buying
        expect(icons).toHaveLength(3)
        expect(icons[0]).toHaveClass('fa-robot')
        expect(icons[1]).toHaveClass('fa-robot')
        expect(icons[2]).toHaveClass('fa-check')
      })
      it('should call setContext by adding a robot and removing 6 foo & 3 foobar to the global context', () => {
        initTest(newContext)

        const buyRobotButton = screen.getByRole('button', { name: 'Acheter un robot' })

        userEvent.click(buyRobotButton)

        act(() => {
          // Advance time just a little more than 0s sec to be sure activity is done
          jest.advanceTimersByTime(50)
        })

        expect(setContext).toHaveBeenCalledTimes(1)
        expect(setContext).toHaveBeenCalledWith({
          ...newContext,
          foo: newContext.foo - 6,
          foobar: newContext.foobar - 3,
          robot: newContext.robot + 1,
        })
      })
      it('should call hook startCounter with robot timeBase (0s)', () => {
        const startCounter = jest.fn()
        jest.spyOn(useTimeHook, 'useTimer').mockReturnValue({
          startCounter,
          status: 'done',
          stopCounter: jest.fn(),
          timeLeft: 0,
        })

        initTest(newContext)

        const buyRobotButton = screen.getByRole('button', { name: 'Acheter un robot' })

        userEvent.click(buyRobotButton)

        act(() => {
          // Advance time just a little more than 0s sec to be sure activity is done
          jest.advanceTimersByTime(50)
        })

        expect(startCounter).toHaveBeenCalledTimes(1)
        expect(startCounter).toHaveBeenCalledWith(0)
      })
    })
    describe('Given 2 buttons has been clicked one after another', () => {
      it('should display the moving text and icon', () => {
        initTest(defaultContextValues)

        const mineFooButton = screen.getByRole('button', { name: 'Miner Foo' })
        const mineBarButton = screen.getByRole('button', { name: 'Miner Bar' })

        userEvent.click(mineFooButton)
        userEvent.click(mineBarButton)

        expect(screen.getByText("Le robot est en train de changer d'activité. Cela prend 5s."))
        const icons = screen.getAllByRole('img', { hidden: true })
        expect(icons).toHaveLength(3)
        // 1 robot at the start of the line, 1 robot in the current active button
        // And one check to show robot is moving
        expect(icons).toHaveLength(3)
        expect(icons[0]).toHaveClass('fa-robot')
        expect(icons[1]).toHaveClass('fa-robot')
        expect(icons[2]).toHaveClass('fa-route')
      })
      it('should call hook startCounter with moving timeBase (5s) then start new activity', () => {
        const startCounter = jest.fn()
        const stopCounter = jest.fn()
        jest
          .spyOn(useTimeHook, 'useTimer')
          .mockReturnValue({
            startCounter,
            status: 'done',
            stopCounter,
            timeLeft: 0,
          })
          .mockReturnValueOnce({
            startCounter,
            status: 'pending',
            stopCounter,
            timeLeft: 0.1,
          })
          .mockReturnValueOnce({
            startCounter,
            status: 'done',
            stopCounter,
            timeLeft: 0,
          })
          .mockReturnValueOnce({
            startCounter,
            status: 'pending',
            stopCounter,
            timeLeft: 0.1,
          })

        initTest(defaultContextValues)

        const mineFooButton = screen.getByRole('button', { name: 'Miner Foo' })
        const mineBarButton = screen.getByRole('button', { name: 'Miner Bar' })

        userEvent.click(mineFooButton)
        userEvent.click(mineBarButton)

        act(() => {
          // Advance time just a little more than 5s sec to be sure activity is done
          jest.advanceTimersByTime(5050)
        })

        // First it calls startCounter with the 1st action called (Miner Foo) on first click
        // Then it calls startCounter again for the moving action on second click
        // Finally it calls startCounter to start mining bar
        expect(startCounter).toHaveBeenCalledTimes(3)
        expect(startCounter).toHaveBeenNthCalledWith(1, 1)
        expect(startCounter).toHaveBeenNthCalledWith(2, 5)
        expect(startCounter).toHaveBeenNthCalledWith(3, 0.5)
        expect(stopCounter).toHaveBeenCalledTimes(2)
        // it calls stopCounter twice : One to end Mining foo, and one to end moving
      })
    })
  })
})
