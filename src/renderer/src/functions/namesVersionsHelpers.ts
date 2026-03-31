type yearType = number | null | undefined

export function mergeYearText(yearStart: yearType, yearEnd: yearType): string {
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

// export function meaningCountText(count: number): string {
//   if (count === 1) return '1 znaczenie'
//   if ([12, 13, 14].includes(count)) return `${count} znaczeń`
//   if ([2, 3, 4].includes(count % 10)) return `${count} znaczenia`
//   return `${count} znaczeń`
// }
