import { Meta } from '@storybook/react/types-6-0'
import { LoadingBar } from 'components/LoadingBar'
import { LoadingBarProps } from 'components/LoadingBar/loadingBar'
import React from 'react'
import useState from 'storybook-addon-state'

export default {
  component: LoadingBar,
  title: 'Components/LoadingBar',
} as Meta

export const Default: React.FC<LoadingBarProps> = () => (
  <>
    <LoadingBar taskTime={60} timeLeft={60} />
    <br />
    <LoadingBar taskTime={60} timeLeft={50} />
    <br />
    <LoadingBar taskTime={60} timeLeft={40} />
    <br />
    <LoadingBar taskTime={60} timeLeft={30} />
    <br />
    <LoadingBar taskTime={60} timeLeft={20} />
    <br />
    <LoadingBar taskTime={60} timeLeft={10} />
    <br />
    <LoadingBar taskTime={60} />
  </>
)

export const Animated: React.FC<LoadingBarProps> = () => {
  const [timeLeft, setTimeLeft] = useState('counts', 5)
  const [hasStared, setStarted] = useState('hasStared', false)
  if (hasStared) {
    timeLeft > 0 && setTimeout(() => setTimeLeft(Math.round((timeLeft - 0.1) * 100) / 100), 100)
  }
  const startCountDown = () => {
    setStarted(true)
  }

  const stopCountDown = () => {
    setStarted(false)
    setTimeLeft(5)
  }
  return (
    <div>
      <button onClick={startCountDown}> Click to see animated LoadingBar </button>
      {timeLeft === 0 && <button onClick={stopCountDown}> Reset </button>}
      <br />
      <br />
      <LoadingBar taskTime={5} timeLeft={timeLeft} />
    </div>
  )
}
