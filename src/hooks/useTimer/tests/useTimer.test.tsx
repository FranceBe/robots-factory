import { act, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useTimer } from 'hooks/useTimer/useTimer.hooks'

describe('useTimer', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    jest.restoreAllMocks()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return 0 if timeBase provided is 0', () => {
    const { result } = renderHook(() => useTimer())
    const { isCounterStarted, startCounter, timeLeft } = result.current
    // when counter is started
    act(() => {
      startCounter(0)
    })

    expect(isCounterStarted).toBe(false)
    expect(timeLeft).toBe(0)
  })
  it('should call setTimeout when timeBase provided is > 0', async () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout')
    const { result } = renderHook(() => useTimer())
    const { startCounter } = result.current
    // when counter is started
    act(() => {
      startCounter(0.2)
    })

    await waitFor(() => {
      expect(setTimeoutSpy).toHaveBeenCalledTimes(4)
    })
  })
  it('should return current timer and isCounterStarted set to true when timer is not over', async () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.startCounter(0.2)
    })

    await waitFor(() => {
      expect(result.current.isCounterStarted).toBe(true)
      expect(result.current.timeLeft).toBe(0.2)
    })
  })
  it('should return 0 and isCounterStarted set to false when timer is done', async () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.startCounter(0.2)
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(result.current.isCounterStarted).toBe(false)
      expect(result.current.timeLeft).toBe(0)
    })
  })
  it('should not start counter if startCounter is not called', async () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useTimer())
    const startCounterSpy = jest.spyOn(result.current, 'startCounter')

    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(startCounterSpy).toHaveBeenCalledTimes(0)
    })
  })
})
