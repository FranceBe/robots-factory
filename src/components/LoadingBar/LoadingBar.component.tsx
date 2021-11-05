// Loading bar component
// This component needs a timeLeft and a timeBase props to calculate the width
// of the FilledBar styled-component
import { LoadingBarProps } from 'components/LoadingBar/loadingBar'
import {
  FilledBar,
  LoadingBarBackground,
  LoadingBarContainer,
  TextContainer,
} from 'components/LoadingBar/loadingBar.style'
import { getFilledBarWidth } from 'components/LoadingBar/loadingBar.utils'
import React, { useEffect, useState } from 'react'

export const LoadingBar: React.FC<LoadingBarProps> = ({ timeLeft = 0, timeBase }) => {
  const [fillBarPercent, setFillBarPercent] = useState(getFilledBarWidth(timeLeft, timeBase))

  useEffect(() => setFillBarPercent(getFilledBarWidth(timeLeft, timeBase)), [timeLeft, timeBase])

  return (
    <LoadingBarContainer data-testid={'loading-bar'}>
      <LoadingBarBackground>
        <FilledBar data-testid={'filled-bar'} filled={fillBarPercent} />
      </LoadingBarBackground>
      <TextContainer>{Math.round(timeLeft * 100) / 100} s</TextContainer>
    </LoadingBarContainer>
  )
}

export default LoadingBar
