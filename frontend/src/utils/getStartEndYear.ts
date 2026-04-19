import type { IMeaningDetails } from '@src/models/meaning.model'
import type { ISourceDetails } from '@src/models/source.model'
import type { IYearStartEnd } from '@src/models/yearStartEnd.model'

export function getYearsFromMeanings(meanings: IMeaningDetails[]): IYearStartEnd {
  const years = meanings
    .flatMap((m) => m.sources)
    .flatMap((s) => [s.yearStart, s.yearEnd])
    .filter((v): v is number => v !== null)

  return { yearStart: Math.min(...years), yearEnd: Math.max(...years) }
}

export function getYearsFromSources(sources: ISourceDetails[]): IYearStartEnd {
  const years = sources
    .flatMap((s) => [s.yearStart, s.yearEnd])
    .filter((v): v is number => v !== null)

  return { yearStart: Math.min(...years), yearEnd: Math.max(...years) }
}
