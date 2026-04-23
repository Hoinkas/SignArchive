import type { ISourceDetails } from '@src/models/source.model'
import { getYearsFromSources } from './getStartEndYear'

type ActualInfo = 'Aktualne' | 'Niedawne' | 'Dawne' | 'Historyczne' | 'Brak informacji'

export function currencyOfSources(sources: ISourceDetails[]): ActualInfo {
  const years = getYearsFromSources(sources)
  if (!years) return 'Brak informacji'

  const referenceYear = years.yearEnd ?? years.yearStart
  if (!referenceYear) return 'Brak informacji'

  const lastSourceOldness = new Date().getFullYear() - referenceYear

  if (lastSourceOldness < 10) return 'Aktualne'
  if (lastSourceOldness < 25) return 'Niedawne'
  if (lastSourceOldness < 50) return 'Dawne'
  return 'Historyczne'
}
