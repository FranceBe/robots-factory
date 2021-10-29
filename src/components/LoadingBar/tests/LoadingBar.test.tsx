import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { render, screen } from '@testing-library/react'
import { LoadingBar } from 'components/LoadingBar'
import { LoadingBarProps } from 'components/LoadingBar/types/loadingBar'
import React from 'react'

describe('LoadingBar component', () => {
  const initTest = (props?: Partial<LoadingBarProps>) =>
    render(<LoadingBar timeBase={100} {...props} />)

  it('should match snapshot', () => {
    const { container } = initTest()

    expect(container.firstChild).toMatchSnapshot()
  })
  it('should render FilledBar with the result of getFilledBarWidth as filled property', () => {
    initTest({ timeLeft: 50 })
    // In this case, timeLeft is 50 and timeBase is 100, so the result
    // of getFilledBarWidth(50, 100) should be 50

    const filledBar = screen.getByTestId('filled-bar')
    expect(filledBar.getAttribute('filled')).toBe('50')
  })
  it('should render timeLeft as text with an "s" as second', () => {
    initTest({ timeLeft: 50 })

    expect(screen.getByText('50 s')).toBeInTheDocument()
  })
})
