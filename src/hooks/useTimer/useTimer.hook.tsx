// useTime hook starts a countdown from the provided taskTime
// and return the time left until it reaches 0 every 100ms
// It also provide a stopCounter function and a status to know if the countdown is over

import { UseTimerType } from 'hooks/useTimer/useTimer'
import { useEffect, useState } from 'react'

export const useTimer = (): UseTimerType => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [hasCounterFinished, setCounterFinished] = useState<boolean | undefined>(undefined)
  const [status, setStatus] = useState('not-started')
  let timer: NodeJS.Timer

  useEffect(() => {
    if (hasCounterFinished !== undefined) {
      if (timeLeft > 0) {
        // As long as timeLeft is > 0, call countDown every 100ms
        timer = setTimeout(() => countDown(), 100)
      }
      if (timeLeft === 0) {
        // When timeLeft is 0, set status to "done"
        setCounterFinished(true)
        setStatus('done')
      }
    }
    return () => {
      clearTimeout(timer)
    }
  }, [timeLeft, hasCounterFinished])

  const countDown = () => {
    // Set status to "pending"
    setStatus('pending')
    // Set timeLeft to its previous self - 0.1
    setTimeLeft((timeLeft) => Math.round((timeLeft - 0.1) * 100) / 100)
  }

  const startCounter = (taskTime: number) => {
    // Set time left to the provided taskTime
    // So the counter starts counting from this value
    setTimeLeft(taskTime)
    // Set status to "started"
    setStatus('started')
    setCounterFinished(false)
  }

  const stopCounter = () => {
    // Clear timeout
    clearTimeout(timer)
    // Set status to "stopped"
    setStatus('stopped')
    // Set timeLeft back to 0
    setTimeLeft(0)
    setCounterFinished(true)
  }

  return { startCounter, status, stopCounter, timeLeft }
}
