import type { IMeaningDetails } from '@src/models/meaning.model'
import type { ISignDetails, ISignSimple } from '@src/models/sign.model'
import { getYearsFromMeanings } from './getStartEndYear'

function getWordsFromMeanings(meanings: IMeaningDetails[]): string[] {
  return meanings.flatMap((m) => m.words.flatMap((w) => w.name))
}

function getRegionsNamesFromMeanings(meanings: IMeaningDetails[]): string[] {
  return meanings.flatMap((m) => {
    if (!m.sources || m.sources.length === 0) return []
    const regions = m.sources.flatMap((s) => s.regions.flatMap((r) => r.name))
    const removedDuplicates = new Set(regions)
    return [...removedDuplicates]
  })
}

export function mapDetailedSignToSimple(detailed: ISignDetails): ISignSimple {
  const { meanings, media, ...rest } = detailed

  return {
    meaningsCount: meanings.length,
    regions: getRegionsNamesFromMeanings(meanings),
    years: getYearsFromMeanings(meanings),
    words: getWordsFromMeanings(meanings),
    media,
    ...rest
  } satisfies ISignSimple
}
