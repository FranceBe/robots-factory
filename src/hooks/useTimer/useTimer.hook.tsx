import { useEffect, useState } from 'react'

export const useTimer = (): {
  timeLeft: number
  status: string
  startCounter: (timeBase: number) => void
  stopCounter: () => void
} => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [hasCounterFinished, setCounterFinished] = useState<boolean | undefined>(undefined)
  const [status, setStatus] = useState('not-started')
  let timer: NodeJS.Timer

  useEffect(() => {
    if (hasCounterFinished !== undefined) {
      if (timeLeft > 0) {
        timer = setTimeout(() => countDown(), 100)
      }
      if (timeLeft === 0) {
        setCounterFinished(true)
        setStatus('done')
      }
    }
    return () => {
      clearTimeout(timer)
    }
  }, [timeLeft, hasCounterFinished])

  const countDown = () => {
    setStatus('pending')
    setTimeLeft((timeLeft) => Math.round((timeLeft - 0.1) * 100) / 100)
  }

  const startCounter = (timeBase: number) => {
    setTimeLeft(timeBase)
    setStatus('started')
    setCounterFinished(false)
  }

  const stopCounter = () => {
    clearTimeout(timer)
    setStatus('stopped')
    setTimeLeft(0)
    setCounterFinished(true)
  }

  return { startCounter, status, stopCounter, timeLeft }
}
