import { Meta } from '@storybook/react/types-6-0'
import { Button } from 'components/Button'
import { ButtonProps } from 'components/Button/button'
import React from 'react'
import styled from 'styled-components'
import { spaces } from 'styles/variables'

const StoryContainer = styled.div`
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  button {
    margin: ${spaces.regular};
  }
`

const StoryLine = styled.div`
  display: flex;
`
export default {
  component: Button,
  title: 'Components/Button',
} as Meta

export const Primary: React.FC<ButtonProps> = () => (
  <StoryContainer>
    <StoryLine>
      <Button>Button enabled</Button>
      <Button disabled>Button disabled</Button>
    </StoryLine>
    <StoryLine>
      <Button isActive>Enabled active</Button>
      <Button disabled isActive>
        Disabled active
      </Button>
    </StoryLine>
    <StoryLine>
      <Button tooltipText={'Tooltip text'}>Enabled with Tooltip</Button>
      <Button disabled tooltipText={'Tooltip text'}>
        Disabled with Tooltip
      </Button>
    </StoryLine>
    <StoryLine>
      <Button tooltipText={'<ul> <li>HTML</li><li>Tooltip</li></ul>'}>
        Enabled with HTML Tooltip
      </Button>
      <Button disabled tooltipText={'<ul> <li>HTML</li><li>Tooltip</li></ul>'}>
        Disabled with HTML Tooltip
      </Button>
    </StoryLine>
  </StoryContainer>
)
export const Secondary: React.FC<ButtonProps> = () => (
  <StoryContainer>
    <StoryLine>
      <Button buttonType={'secondary'}>Button enabled</Button>
      <Button buttonType={'secondary'} disabled>
        Button disabled
      </Button>
    </StoryLine>
    <StoryLine>
      <Button buttonType={'secondary'} isActive>
        Enabled Active
      </Button>
      <Button buttonType={'secondary'} disabled isActive>
        Disabled Active
      </Button>
    </StoryLine>
    <StoryLine>
      <Button buttonType={'secondary'} tooltipText={'Tooltip text'}>
        Enabled with Tooltip
      </Button>
      <Button buttonType={'secondary'} disabled tooltipText={'Tooltip text'}>
        Disabled with Tooltip
      </Button>
    </StoryLine>
    <StoryLine>
      <Button buttonType={'secondary'} tooltipText={'<ul> <li>HTML</li><li>Tooltip</li></ul>'}>
        Enabled with HTML Tooltip
      </Button>
      <Button
        buttonType={'secondary'}
        disabled
        tooltipText={'<ul> <li>HTML</li><li>Tooltip</li></ul>'}
      >
        Disabled with HTML Tooltip
      </Button>
    </StoryLine>
  </StoryContainer>
)
