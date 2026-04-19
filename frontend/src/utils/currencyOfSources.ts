import type { ISourceDetails } from '@src/models/source.model'
import { getYearsFromSources } from './getStartEndYear'

type ActualInfo = 'Historyczne' | 'Aktualne'

export function currencyOfSources(sources: ISourceDetails[]): ActualInfo {
  const years = getYearsFromSources(sources)
  if (!years.yearStart && !years.yearEnd) return

  const todayYear = new Date().getFullYear()
  const lastSourceOldness = todayYear - years.yearEnd

  if (lastSourceOldness < 5) return 'Aktualne'
  return 'Historyczne'
}
