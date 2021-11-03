// Function that returns a random number between 0.5 and 2
// The number will have 1 digit to the left of the decimal point (0.5, 0.6, ...)
// The function is used to get the mining bar time needed for a round
export const getBarTime = (): number => {
  return Math.round((Math.random() * (2 - 0.5) + 0.5) * 10) / 10
}
