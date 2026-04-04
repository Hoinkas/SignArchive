type yearType = number | null | undefined

export function mergeYearText(yearStart: yearType, yearEnd: yearType): string {
  if (yearStart && yearStart === yearEnd) return yearStart?.toString()
  if (yearStart && yearEnd) return yearStart + '-' + yearEnd
  return yearStart?.toString() || yearEnd?.toString() || 'brak roku'
}

export const sourcesCountText = (count: number): string => {
  if (count === 1) return '1 źródło'
  if ([12, 13, 14].includes(count)) return `${count} źródeł`
  if ([2, 3, 4].includes(count % 10)) return `${count} źródła`
  return `${count} źródeł`
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
