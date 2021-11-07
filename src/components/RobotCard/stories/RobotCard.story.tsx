import { Meta } from '@storybook/react/types-6-0'
import { IconProps } from 'components/Icon/icon'
import { LoadingBarProps } from 'components/LoadingBar/loadingBar'
import { RobotCard } from 'components/RobotCard'
import { RobotCardProps } from 'components/RobotCard/robotCard'
import React from 'react'
import styled from 'styled-components'
import { palette } from 'styles/variables'
import { IconEnum } from 'utils/common.enum'

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

const loadingBar: LoadingBarProps = { taskTime: 1, timeLeft: 0.5 }
const iconInfo: IconProps = { spin: true, type: IconEnum.spinner }
const textInfo = 'Le robot est en train de miner du Foo. Cela prend 1s / Foo.'

const textInfoEmpty = ''

export const Default: React.FC<RobotCardProps> = () => (
  <StoryDiv>
    <RobotCard
      fooButton={{ isActive: false }}
      barButton={{ isActive: false }}
      foobarButton={{
        disabled: true,
        isActive: false,
        tooltipText:
          '<p>Requiert <span class="foobar-foo">1 Foo</span> et <span class="foobar-bar">1 Bar</span>.</p>',
      }}
      robotButton={{
        disabled: true,
        isActive: false,
        tooltipText:
          '<p>Requiert <span class="robot-foobar">3 Foobar</span>  et <span class="robot-foo">6 Foo</span>.</p>',
      }}
      loadingBar={{ taskTime: 0 }}
      textInfo={textInfoEmpty}
      robotId={1}
    />
  </StoryDiv>
)

export const DoingAnActivity: React.FC<RobotCardProps> = () => (
  <StoryDiv>
    <RobotCard
      fooButton={{ isActive: true }}
      barButton={{ isActive: false }}
      foobarButton={{
        disabled: true,
        isActive: false,
        tooltipText:
          '<p>Requiert <span class="foobar-foo">1 Foo</span> et <span class="foobar-bar">1 Bar</span>.</p>',
      }}
      robotButton={{
        disabled: true,
        isActive: false,
        tooltipText:
          '<p>Requiert <span class="robot-foobar">3 Foobar</span>  et <span class="robot-foo">6 Foo</span>.</p>',
      }}
      loadingBar={loadingBar}
      iconInfo={iconInfo}
      textInfo={textInfo}
      robotId={1}
    />
  </StoryDiv>
)
