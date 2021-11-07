import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
import { ButtonProps } from 'components/Button/button'
import { IconProps } from 'components/Icon/icon'
import { LoadingBarProps } from 'components/LoadingBar/loadingBar'
import { RobotCard } from 'components/RobotCard'
import React from 'react'
import { IconEnum } from 'utils/common.enum'

describe('RobotCard component', () => {
  // Set up test
  const fooButton: ButtonProps = { isActive: true }
  const barButton: ButtonProps = { isActive: false }
  const foobarButton: ButtonProps = { disabled: true }
  const robotButton: ButtonProps = { disabled: true }
  const loadingBar: LoadingBarProps = { taskTime: 1, timeLeft: 0.5 }
  const iconInfo: IconProps = { spin: true, type: IconEnum.spinner }
  const textInfo = 'Le robot est en train de miner du Foo. Cela prend 1s / Foo.'
  const robotId = 1

  const initTest = () =>
    render(
      <RobotCard
        fooButton={fooButton}
        barButton={barButton}
        foobarButton={foobarButton}
        robotButton={robotButton}
        loadingBar={loadingBar}
        iconInfo={iconInfo}
        textInfo={textInfo}
        robotId={robotId}
      />,
    )

  it('should match snapshot', () => {
    const { container } = initTest()

    expect(container.firstChild).toMatchSnapshot()
  })
  it('should render 3 icons and robot name', () => {
    initTest()

    const icons = screen.getAllByRole('img', { hidden: true })
    // 2 robot icons (1 with name and 1 in the active button)
    // 1 spinner icon
    expect(icons).toHaveLength(3)
    expect(icons[0]).toHaveClass('fa-robot')
    expect(icons[1]).toHaveClass('fa-robot')
    expect(icons[2]).toHaveClass('fa-spinner')

    const robotName = `Robot ${robotId}`
    expect(screen.getByText(robotName)).toBeInTheDocument()
  })
  it('should render 4 buttons', () => {
    initTest()

    const buttonsRendered = screen.getAllByRole('button')
    expect(buttonsRendered).toHaveLength(4)
    expect(screen.getByText('Miner Foo')).toBeInTheDocument()
    expect(screen.getByText('Miner Bar')).toBeInTheDocument()
    expect(screen.getByText('Assembler Foobar')).toBeInTheDocument()
    expect(screen.getByText('Acheter un robot')).toBeInTheDocument()
  })
  it('shoud render a LoadingBar', () => {
    initTest()

    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
    expect(screen.getByTestId('filled-bar')).toBeInTheDocument()
  })
  it('should render textInfo', () => {
    initTest()

    expect(screen.getByText(textInfo)).toBeInTheDocument()
  })
})
