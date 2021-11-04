import { getButtons, hasEnoughResource } from 'containers/RobotManager/robotManager.utils'
import { tooltipTexts } from 'containers/RobotManager/robotManager.variables'
import { defaultRobotsResources } from 'contexts/robotsContext/robotsContext.variables'
import { nameByActivity } from 'hooks/useActivity/useActivity.variables'
import React from 'react'
import { ThemeType } from 'utils/common.variables'

describe('RobotManager utils', () => {
  afterAll(() => {
    jest.restoreAllMocks()
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
    it('should return false if resource is undefined', () => {
      const resultFooFail = hasEnoughResource(undefined, 4, 'robot')
      expect(resultFooFail).toBe(false)
    })
    it('should return false if target is undefined', () => {
      const resultFooFail = hasEnoughResource('foo', 4, undefined)
      expect(resultFooFail).toBe(false)
    })
  })
  describe('getButtons', () => {
    it('should return an array of ButtonProps', () => {
      const action = jest.fn()
      const result = getButtons('foo', action, defaultRobotsResources)
      expect(result.toString()).toEqual(
        [
          {
            buttonType: ThemeType.primary,
            children: 'Miner Foo',
            isActive: true,
            onClick: () => action(nameByActivity.foo),
          },
          {
            buttonType: ThemeType.primary,
            children: 'Miner Bar',
            isActive: false,
            onClick: () => action(nameByActivity.bar),
          },
          {
            buttonType: ThemeType.primary,
            children: 'Assembler Foobar',
            disabled: true,
            isActive: false,
            onClick: () => action(nameByActivity.foobar),
            tooltipText: tooltipTexts.foobar,
          },
          {
            buttonType: ThemeType.secondary,
            children: 'Acheter un robot',
            disabled: true,
            isActive: false,
            onClick: () => action(nameByActivity.robot),
            tooltipText: tooltipTexts.robot,
          },
        ].toString(),
      )
    })
    it('should call action with robotName when button onClick is triggered', () => {
      const action = jest.fn()
      const result = getButtons('foo', action, defaultRobotsResources)
      // When onClick is triggered
      const event = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>
      result[0] && result[0].onClick && result[0].onClick(event)

      expect(action).toHaveBeenCalledTimes(1)
      expect(action).toHaveBeenCalledWith(nameByActivity.foo)

      // When onClick is triggered
      result[1] && result[1].onClick && result[1].onClick(event)
      expect(action).toHaveBeenCalledWith(nameByActivity.bar)

      // When onClick is triggered
      result[2] && result[2].onClick && result[2].onClick(event)
      expect(action).toHaveBeenCalledWith(nameByActivity.foobar)

      // When onClick is triggered
      result[3] && result[3].onClick && result[3].onClick(event)
      expect(action).toHaveBeenCalledWith(nameByActivity.robot)
    })
  })
})
