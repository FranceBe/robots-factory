import { Meta } from '@storybook/react/types-6-0'
import { ButtonProps } from 'components/Button/button'
import { IconProps } from 'components/Icon/icon'
import { LoadingBarProps } from 'components/LoadingBar/loadingBar'
import { RobotCard } from 'components/RobotCard'
import { RobotCardProps } from 'components/RobotCard/robotCard'
import React from 'react'
import styled from 'styled-components'
import { palette } from 'styles/variables'

const StoryDiv = styled.div`
  .foobar-foo,
  .robot-foobar {
    color: ${palette.green_primary};
  }
  .foobar-bar,
  .robot-foo {
    color: ${palette.red_primary};
  }
`
export default {
  component: RobotCard,
  title: 'Components/RobotCard',
} as Meta

const buttons: ButtonProps[] = [
  { buttonType: 'primary', children: 'Miner Foo', isActive: true },
  { buttonType: 'primary', children: 'Miner Bar' },
  {
    buttonType: 'primary',
    children: 'Assembler Foobar',
    disabled: true,
    tooltipText:
      '<p>Requiert <span class="foobar-foo">1 Foo</span> et <span class="foobar-bar">1 Bar</span>.</p>',
  },
  {
    buttonType: 'secondary',
    children: 'Acheter un robot',
    disabled: true,
    tooltipText:
      '<p>Requiert <span class="robot-foobar">3 Foobar</span>  et <span class="robot-foo">6 Foo</span>.</p>',
  },
]
const loadingBar: LoadingBarProps = { timeBase: 1, timeLeft: 0.5 }
const iconInfo: IconProps = { spin: true, type: 'spinner' }
const textInfo = 'Le robot est en train de miner du Foo. Cela prend 1s / Foo.'

export const Default: React.FC<RobotCardProps> = () => (
  <StoryDiv>
    <RobotCard
      buttons={buttons}
      loadingBar={loadingBar}
      iconInfo={iconInfo}
      textInfo={textInfo}
      robotId={'1'}
    />
  </StoryDiv>
)
