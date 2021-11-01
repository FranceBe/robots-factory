import { Icon } from 'components/Icon/Icon.component'
import { arrayFromContextRobotLength, getTotalsFromContext } from 'pages/Home/home.service'
import React from 'react'

describe('Home service', () => {
  describe('getTotalsFromContext', () => {
    it('should return an array of TotalsProps depending on the provided context', () => {
      const context = {
        bar: 2,
        foo: 1,
        foobar: 3,
        robot: 5,
      }
      const result = getTotalsFromContext(context)
      expect(result.toString()).toBe(
        [
          { label: 'Foo', total: 1, type: 'primary' },
          { label: 'Bar', total: 2, type: 'primary' },
          { label: 'Foobar', total: 3, type: 'primary' },
          { label: <Icon type={'robot'} />, total: 5, type: 'secondary' },
        ].toString(),
      )
    })
  })
  describe('arrayFromContextRobotLength', () => {
    it('should return an array of context.robot length', () => {
      const context = {
        bar: 2,
        foo: 1,
        foobar: 3,
        robot: 5,
      }
      const result = arrayFromContextRobotLength(context)

      expect(result).toHaveLength(context.robot)
      expect(result).toEqual([0, 1, 2, 3, 4])
    })
  })
})
