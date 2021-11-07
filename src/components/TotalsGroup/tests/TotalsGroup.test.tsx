import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
import { TotalsGroup } from 'components/TotalsGroup'
import { ResourceType } from 'contexts/robotsContext/robotContext'
import React from 'react'

describe('TotalsGroup component', () => {
  const totals: ResourceType = {
    bar: 0,
    foo: 4,
    foobar: 10,
    robot: 6,
  }

  const initTest = () => render(<TotalsGroup totals={totals} />)

  it('should match snapshot', () => {
    const { container } = initTest()

    expect(container.firstChild).toMatchSnapshot()
  })
  it('should render 4 Totals component', () => {
    initTest()

    expect(screen.getAllByTestId('totals-component')).toHaveLength(4)
  })
  it('should render each labels and total as text', () => {
    initTest()

    expect(screen.getByText('Foo')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('Bar')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('Foobar')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('fa-robot')
    expect(screen.getByText('6')).toBeInTheDocument()
  })
})
