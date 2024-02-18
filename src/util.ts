import { formatDistanceToNowStrict } from 'date-fns'

export function humanizeNumber(candidate: number): string {
  if (Number.isNaN(candidate)) return '0'

  // Converting -ve numbers to +ve via abs so that log10 works as expected
  const numberOfDigits = Math.floor(Math.log10(Math.abs(candidate)))

  if (numberOfDigits <= 2) return String(candidate) // Return as is for a 3 digit number or less

  const unit = Math.floor(numberOfDigits / 3)

  const shortened =
    Math.pow(10, numberOfDigits - unit * 3) *
    Number((candidate / Math.pow(10, numberOfDigits)).toFixed(2))

  // Rounding to 2 decimal places
  return Math.round(shortened * 100) / 100 + ['', 'k', 'm', 'b', 't'][unit]
}

export function fromNow(time: string) {
  return formatDistanceToNowStrict(time, { addSuffix: true })
}
