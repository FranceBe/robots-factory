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
    const { startCounter, timeLeft } = result.current
    // when counter is started
    act(() => {
      startCounter(0)
    })

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
  it('should return current timer and hasCounterFinished until countdown is over', () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.startCounter(0.2)
    })

    expect(result.current.status).toBe('started')
    expect(result.current.timeLeft).toBe(0.2)

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(result.current.status).toBe('pending')
    expect(result.current.timeLeft).toBe(0.1)

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(result.current.status).toBe('done')
    expect(result.current.timeLeft).toBe(0)
  })
  it('should stop counter if stopCounter is clicked', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.startCounter(0.2)
    })

    expect(result.current.status).toBe('started')
    expect(result.current.timeLeft).toBe(0.2)

    act(() => {
      result.current.stopCounter()
    })

    expect(result.current.status).toBe('done')
    expect(result.current.timeLeft).toBe(0)
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
