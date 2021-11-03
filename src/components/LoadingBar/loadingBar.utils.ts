// Calculate a percentage from the timeBase and the timeLeft
// To display correctly the width of the FilledBar styled-component
export const getFilledBarWidth = (timeLeft: number, timeBase: number | null): number => {
  if (timeLeft < 0 || !timeBase) {
    return 0
  }
  const timeDifference = timeBase - timeLeft
  if (timeDifference < 0) {
    return 100
  }
  const percent = (timeDifference / timeBase) * 100
  return Math.round(percent * 100) / 100
}
