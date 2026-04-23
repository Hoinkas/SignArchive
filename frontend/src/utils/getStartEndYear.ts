import type { IMeaningDetails } from '@src/models/meaning.model'
import type { ISourceDetails } from '@src/models/source.model'
import type { IYearStartEnd } from '@src/models/yearStartEnd.model'

export function getYearsFromMeanings(meanings: IMeaningDetails[]): IYearStartEnd {
  if (!meanings || meanings.length === 0) return undefined
  const sources = meanings.flatMap((m) => m.sources)

  if (sources.length === 0) return undefined
  const years = sources
    .flatMap((s) => [s.yearStart, s.yearEnd])
    .filter((v): v is number => v !== null && v !== undefined)

  if (years.length === 0) return { yearStart: null, yearEnd: null }

  return { yearStart: Math.min(...years), yearEnd: Math.max(...years) }
}

export function getYearsFromSources(sources: ISourceDetails[]): IYearStartEnd | undefined {
  if (!sources || sources.length === 0) return undefined
  const years = sources
    .flatMap((s) => [s.yearStart, s.yearEnd])
    .filter((v): v is number => v !== null && v !== undefined)

  return { yearStart: Math.min(...years), yearEnd: Math.max(...years) }
}
