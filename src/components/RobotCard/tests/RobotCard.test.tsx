import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
import { RobotCard } from 'components/RobotCard'
import React from 'react'

import { ButtonProps } from '../../Button/types/button'
import { IconProps } from '../../Icon/types/icon'
import { LoadingBarProps } from '../../LoadingBar/types/loadingBar'

describe('RobotCard component', () => {
  // Set up test
  const buttons: ButtonProps[] = [
    { buttonType: 'primary', children: 'Miner Foo', isActive: true },
    { buttonType: 'primary', children: 'Miner Bar' },
    {
      buttonType: 'primary',
      children: 'Assembler Foobar',
      disabled: true,
    },
    {
      buttonType: 'secondary',
      children: 'Acheter un robot',
      disabled: true,
    },
  ]
  const loadingBar: LoadingBarProps = { timeBase: 1, timeLeft: 0.5 }
  const iconInfo: IconProps = { spin: true, type: 'spinner' }
  const textInfo = 'Le robot est en train de miner du Foo. Cela prend 1s / Foo.'
  const robotId = 1
  const initTest = () =>
    render(
      <RobotCard
        buttons={buttons}
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

    const robotIcons = screen.getAllByRole('img', { hidden: true })
    // 2 robot icons (1 with name and 1 in the active button)
    // 1 spinner icon
    expect(robotIcons).toHaveLength(3)
    expect(robotIcons[0]).toHaveClass('fa-robot')
    expect(robotIcons[1]).toHaveClass('fa-robot')
    expect(robotIcons[2]).toHaveClass('fa-spinner')

    const robotName = `Robot ${robotId}`
    expect(screen.getByText(robotName)).toBeInTheDocument()
  })
  it('should render buttons.length button', () => {
    initTest()

    const buttonsRendered = screen.getAllByRole('button')
    expect(buttonsRendered).toHaveLength(buttons.length)
    buttons.forEach((button) => expect(screen.getByText(`${button.children}`)).toBeInTheDocument())
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