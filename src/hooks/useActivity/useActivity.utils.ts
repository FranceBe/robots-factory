import { timeMinMaxForBar } from 'utils/settings'
// Function that returns a random number between 0.5 and 2
// The number will have 1 digit to the left of the decimal point (0.5, 0.6, ...)
// The function is used to get the mining bar time needed for a round
export const getBarTime = (): number => {
  const { min, max } = timeMinMaxForBar
  const randomInRange = Math.random() * (max - min) + min
  return Math.round(randomInRange * 10) / 10
}
