import type { IYearStartEnd } from '@src/models/yearStartEnd.model'

export function mergeYearText(years: IYearStartEnd): string {
  const { yearStart, yearEnd } = years

  if (yearStart && yearStart === yearEnd) return yearStart?.toString()
  if (yearStart && yearEnd) return yearStart + '-' + yearEnd
  return yearStart?.toString() || yearEnd?.toString() || 'Brak roku'
}

export const wordsCountText = (count: number): string => {
  if (count === 1) return '1 słowo'
  if ([12, 13, 14].includes(count)) return `${count} słów`
  if ([2, 3, 4].includes(count % 10)) return `${count} słowa`
  return `${count} słów`
}

export const sourcesCountText = (count: number): string => {
  if (count === 1) return '1 źródło'
  if ([12, 13, 14].includes(count)) return `${count} źródeł`
  if ([2, 3, 4].includes(count % 10)) return `${count} źródła`
  return `${count} źródeł`
}

export function meaningCountText(count: number): string {
  if (count === 1) return '1 znaczenie'
  if ([12, 13, 14].includes(count)) return `${count} znaczeń`
  if ([2, 3, 4].includes(count % 10)) return `${count} znaczenia`
  return `${count} znaczeń`
}

export function signCountText(count: number): string {
  if (count === 1) return '1 znak'
  if ([12, 13, 14].includes(count)) return `${count} znaków`
  if ([2, 3, 4].includes(count % 10)) return `${count} znaki`
  return `${count} znaków`
}

export function titleCase(str: string): string {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}
