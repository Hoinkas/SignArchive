import type { IMeaningDetails } from '@src/models/meaning.model'
import type { ISignDetails, ISignSimple } from '@src/models/sign.model'
import type { IYearStartEnd } from '@src/models/yearStartEnd.model'

function getYearStartEndFromMeanings(meanings: IMeaningDetails[]): IYearStartEnd {
  const years = meanings.flatMap((m) => m.sources.flatMap((s) => [s.yearStart, s.yearEnd]))
  return { yearStart: Math.min(...years), yearEnd: Math.max(...years) }
}

function getWordsFromMeanings(meanings: IMeaningDetails[]): string[] {
  return meanings.flatMap((m) => m.words.flatMap((w) => w.name))
}

export function mapDetailedSignToSimple(detailed: ISignDetails): ISignSimple {
  const { meanings, regions, media, ...rest } = detailed

  return {
    meaningsCount: meanings.length,
    regions: regions.map((r) => r.name),
    years: getYearStartEndFromMeanings(meanings),
    words: getWordsFromMeanings(meanings),
    media,
    ...rest
  } satisfies ISignSimple
}
