import {
  getBarTime,
  getButtons,
  getLoadingBarTimeBase,
  hasEnoughResource,
  hasFoobarSucceed,
} from 'containers/RobotManager/robotManager.service'
import {
  barName,
  foobarName,
  fooName,
  robotName,
  timeBases,
  tooltipTexts,
} from 'containers/RobotManager/robotManager.variables'
import { defaultContextValues } from 'hooks/globalContext/globalContext.variables'
import React from 'react'

describe('RobotManager service', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })
  describe('getBarTime', () => {
    it('should return a number between 0.5 and 2', () => {
      const result = getBarTime()
      const isBetweenO5and2 = result >= 0.5 && result <= 2
      expect(isBetweenO5and2).toBe(true)
    })
    it('should round number provided by random method', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.6789)
      // first part of calculus is Math.random() * (2 - 0.5) + 0.5
      // and 0.6789 * (2 - 0.5) + 0.5 = 1.5183499999999999
      // Then 1.5183499999999999 is rounded to only get 1 digit after the .
      const result = getBarTime()
      expect(result).toBe(1.5)
    })
  })
  describe('hasFoobarSucceed', () => {
    it('should return true if random number (between 0 and 100) is 60 or less', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.593)
      // In the function, Math.random() * 100 and 0.593 * 100 = 59.3
      // then it's rounded so we get 59, and 59 <= 60 so it should return true
      const result = hasFoobarSucceed()
      expect(result).toBe(true)
    })
    it('should return false if random number (between 0 and 100) is 61 or more', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.751)
      // In the function, Math.random() * 100 and 0.751 * 100 = 75.1
      // then it's rounded so we get 75, and 75 > 60 so it should return false
      const result = hasFoobarSucceed()
      expect(result).toBe(false)
    })
  })
  describe('hasEnoughResource', () => {
    it('should return true if contextResource >= required resource to build a foobar', () => {
      // A foobar needs 1 foo and 1 bar
      const resultFooFail = hasEnoughResource('foo', 0, 'foobar')
      expect(resultFooFail).toBe(false)

      const resultFooSuccess = hasEnoughResource('foo', 4, 'foobar')
      expect(resultFooSuccess).toBe(true)

      const resultBarFail = hasEnoughResource('bar', 0, 'foobar')
      expect(resultBarFail).toBe(false)

      const resultBarSuccess = hasEnoughResource('bar', 6, 'foobar')
      expect(resultBarSuccess).toBe(true)
    })
    it('should return true if contextResource >= required resource to buy a robot', () => {
      // A robot needs 6 foo and 3 foobar
      const resultFooFail = hasEnoughResource('foo', 4, 'robot')
      expect(resultFooFail).toBe(false)

      const resultFooSuccess = hasEnoughResource('foo', 7, 'robot')
      expect(resultFooSuccess).toBe(true)

      const resultFoobarFail = hasEnoughResource('foobar', 2, 'robot')
      expect(resultFoobarFail).toBe(false)

      const resultFoobarSuccess = hasEnoughResource('foobar', 4, 'robot')
      expect(resultFoobarSuccess).toBe(true)
    })
  })
  describe('getButtons', () => {
    it('should return an array of ButtonProps', () => {
      const action = jest.fn()
      const result = getButtons('foo', action, defaultContextValues)
      expect(result.toString()).toEqual(
        [
          {
            buttonType: 'primary',
            children: 'Miner Foo',
            isActive: true,
            onClick: () => action(fooName),
          },
          {
            buttonType: 'primary',
            children: 'Miner Bar',
            isActive: false,
            onClick: () => action(barName),
          },
          {
            buttonType: 'primary',
            children: 'Assembler Foobar',
            disabled: true,
            isActive: false,
            onClick: () => action(foobarName),
            tooltipText: tooltipTexts.foobar,
          },
          {
            buttonType: 'secondary',
            children: 'Acheter un robot',
            disabled: true,
            isActive: false,
            onClick: () => action(robotName),
            tooltipText: tooltipTexts.robot,
          },
        ].toString(),
      )
    })
    it('should call action with robotName when button onClick is triggered', () => {
      const action = jest.fn()
      const result = getButtons('foo', action, defaultContextValues)
      // When onClick is triggered
      const event = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>
      result[0] && result[0].onClick && result[0].onClick(event)

      expect(action).toHaveBeenCalledTimes(1)
      expect(action).toHaveBeenCalledWith(fooName)

      // When onClick is triggered
      result[1] && result[1].onClick && result[1].onClick(event)
      expect(action).toHaveBeenCalledWith(barName)

      // When onClick is triggered
      result[2] && result[2].onClick && result[2].onClick(event)
      expect(action).toHaveBeenCalledWith(foobarName)

      // When onClick is triggered
      result[3] && result[3].onClick && result[3].onClick(event)
      expect(action).toHaveBeenCalledWith(robotName)
    })
  })
  describe('getLoadingBarTimeBase', () => {
    it('should return null if isMoving is false and activeActivity is undefined', () => {
      const result = getLoadingBarTimeBase(false, undefined, 1)
      expect(result).toBe(null)
    })
    it('should return timeBases.moving if isMoving is true', () => {
      const result = getLoadingBarTimeBase(true, undefined, 1)
      expect(result).toBe(timeBases.moving)
    })
    it('should return barTimeBaseState if isMoving is false and activeActivity is bar', () => {
      const result = getLoadingBarTimeBase(false, 'bar', 1.5)
      expect(result).toBe(1.5)
    })
    it('should return timeBases[activeActivity] if isMoving is false and activeActivity is not bar', () => {
      const result = getLoadingBarTimeBase(false, 'foo', 1.5)
      expect(result).toBe(timeBases.foo)
    })
  })
})
