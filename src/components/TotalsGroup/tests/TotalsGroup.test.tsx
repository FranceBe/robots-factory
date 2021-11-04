import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
import { Icon } from 'components/Icon'
import { TotalsProps } from 'components/Totals/totals'
import { TotalsGroup } from 'components/TotalsGroup'
import React from 'react'
import { ThemeType } from 'utils/common.variables'

describe('TotalsGroup component', () => {
  const defaultContent: TotalsProps[] = [
    { label: 'Foo', total: 4, type: ThemeType.primary },
    { label: 'Bar', total: 0, type: ThemeType.primary },
    { label: 'Foobar', total: 10, type: ThemeType.primary },
    { label: <Icon type={'robot'} />, total: 6, type: ThemeType.secondary },
  ]

  const initTest = () => render(<TotalsGroup content={defaultContent} />)

  it('should match snapshot', () => {
    const { container } = initTest()

    expect(container.firstChild).toMatchSnapshot()
  })
  it('should render content.length Totals component', () => {
    initTest()

    expect(screen.getAllByTestId('totals-component')).toHaveLength(defaultContent.length)
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
