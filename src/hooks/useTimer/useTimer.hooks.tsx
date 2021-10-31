import { useEffect, useState } from 'react'

export const useTimer = (): {
  timeLeft: number
  isCounterStarted: boolean
  startCounter: (timeBase: number) => void
} => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isCounterStarted, setCounterStarted] = useState(false)

  useEffect(() => {
    if (isCounterStarted) {
      timeLeft > 0 && setTimeout(() => countDown(), 100)
      timeLeft === 0 && setCounterStarted(false)
    }
    return () => {
      clearTimeout()
    }
  }, [timeLeft, isCounterStarted])

  const countDown = () => {
    !isCounterStarted && setCounterStarted(true)
    setTimeLeft((timeLeft) => Math.round((timeLeft - 0.1) * 10) / 10)
  }

  const startCounter = (timeBase: number) => {
    setTimeLeft(timeBase)
    setCounterStarted(true)
  }

  return { isCounterStarted, startCounter, timeLeft }
}
