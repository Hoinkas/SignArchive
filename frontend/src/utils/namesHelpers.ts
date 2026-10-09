import type { IYearStartEnd } from "@src/models/yearStartEnd.model"

export function mergeYearText(years: IYearStartEnd | null): string {
  if (!years) return '-'
  const { yearStart, yearEnd } = years

  if (!yearStart && !yearEnd) return '-'
  if (!yearStart && yearEnd) return yearEnd.toString()
  if (!yearEnd && yearStart) return yearStart.toString()
  if (yearStart && yearStart === yearEnd) return yearStart.toString()
  if (yearStart && yearEnd) return yearStart + '-' + yearEnd
  return yearStart?.toString() || yearEnd?.toString() || '-'
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
