import type { IYearStartEnd } from "@src/models/yearStartEnd.model"

export function mergeYears(yearStart: number | undefined, yearEnd: number | undefined): IYearStartEnd {
  const years: IYearStartEnd = {yearStart, yearEnd}
  return years
}
export function mergeYearsToText(yearStart: number | undefined, yearEnd: number | undefined): string {
  return mergeYearToText(mergeYears(yearStart, yearEnd))
}

export function mergeYearToText(years: IYearStartEnd | null): string {
  if (!years) return '-'
  const { yearStart, yearEnd } = years

  if (!yearStart && !yearEnd) return '-'
  if (!yearStart && yearEnd) return yearEnd.toString()
  if (!yearEnd && yearStart) return yearStart.toString()
  if (yearStart && yearStart === yearEnd) return yearStart.toString()
  if (yearStart && yearEnd) return yearStart + '-' + yearEnd
  return yearStart?.toString() || yearEnd?.toString() || '-'
}

export function titleCase(str: string): string {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}