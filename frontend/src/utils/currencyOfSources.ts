import type { ISourceDetails } from '@src/models/source.model'
import { getYearsFromSources } from './getStartEndYear'

type ActualInfo = 'Historyczne' | 'Aktualne' | 'Brak informacji'

export function currencyOfSources(sources: ISourceDetails[]): ActualInfo {
  const years = getYearsFromSources(sources)
  if (!years) return 'Brak informacji'

  const referenceYear = years.yearEnd ?? years.yearStart
  if (referenceYear === null || referenceYear === undefined) return 'Brak informacji'

  const lastSourceOldness = new Date().getFullYear() - referenceYear

  if (lastSourceOldness < 5) return 'Aktualne'
  return 'Historyczne'
}
