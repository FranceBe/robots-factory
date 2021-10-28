import { LoadingBarProps } from 'components/LoadingBar/loadingBar'
import { getFilledBarWidth } from 'components/LoadingBar/loadingBar.service'
import {
  FilledBar,
  LoadingBarBackground,
  LoadingBarContainer,
  TextContainer,
} from 'components/LoadingBar/loadingBar.style'
import React from 'react'

export const LoadingBar: React.FC<LoadingBarProps> = ({ timeLeft = 0, timeBase }) => {
  return (
    <LoadingBarContainer>
      <LoadingBarBackground>
        <FilledBar data-testid={'filledBar'} filled={getFilledBarWidth(timeLeft, timeBase)} />
      </LoadingBarBackground>
      <TextContainer>{timeLeft} s</TextContainer>
    </LoadingBarContainer>
  )
}

export default LoadingBar
