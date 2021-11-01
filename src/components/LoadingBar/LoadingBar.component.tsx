import { getFilledBarWidth } from 'components/LoadingBar/loadingBar.service'
import {
  FilledBar,
  LoadingBarBackground,
  LoadingBarContainer,
  TextContainer,
} from 'components/LoadingBar/loadingBar.style'
import { LoadingBarProps } from 'components/LoadingBar/types/loadingBar'
import React from 'react'

export const LoadingBar: React.FC<LoadingBarProps> = ({ timeLeft = 0, timeBase }) => {
  return (
    <LoadingBarContainer data-testid={'loading-bar'}>
      <LoadingBarBackground>
        <FilledBar data-testid={'filled-bar'} filled={getFilledBarWidth(timeLeft, timeBase)} />
      </LoadingBarBackground>
      <TextContainer>{Math.round(timeLeft * 100) / 100} s</TextContainer>
    </LoadingBarContainer>
  )
}

export default LoadingBar
