// Loading bar component
// This component needs a timeLeft and a taskTime props to calculate the width
// of the FilledBar styled-component
import { LoadingBarProps } from 'components/LoadingBar/loadingBar'
import {
  FilledBar,
  LoadingBarBackground,
  LoadingBarContainer,
  TextContainer,
} from 'components/LoadingBar/loadingBar.style'
import { getFilledBarWidth } from 'components/LoadingBar/loadingBar.utils'
import React from 'react'

export const LoadingBar: React.FC<LoadingBarProps> = ({ timeLeft = 0, taskTime }) => {
  return (
    <LoadingBarContainer data-testid={'loading-bar'}>
      <LoadingBarBackground>
        <FilledBar data-testid={'filled-bar'} filled={getFilledBarWidth(timeLeft, taskTime)} />
      </LoadingBarBackground>
      <TextContainer>{Math.round(timeLeft * 100) / 100} s</TextContainer>
    </LoadingBarContainer>
  )
}

export default LoadingBar
