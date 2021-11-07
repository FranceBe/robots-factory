export type UseTimerType = {
  timeLeft: number
  status: string
  startCounter: (taskTime: number) => void
  stopCounter: () => void
}
