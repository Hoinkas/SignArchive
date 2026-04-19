import type { IMeaningDetails } from '@src/models/meaning.model'
import './MeaningItem.css'
import SourceItem from '../SourceItem/SourceItem'
import type { ISourceDetails } from '@src/models/source.model'
import { getYearsFromSources } from '@src/utils/getStartEndYear'

type ActualInfo = 'Historyczne' | 'Aktualne' | 'Brak informacji'

function actualityOfInfo(sources: ISourceDetails[]): ActualInfo{
  const years = getYearsFromSources(sources)
  if (!years.yearStart && !years.yearEnd) return 'Brak informacji'

  const todayYear = new Date().getFullYear()
  const lastSourceOldness = todayYear - years.yearEnd

  if (lastSourceOldness < 5) return 'Aktualne'
  return 'Historyczne'
}

interface MeaningItemProps {
  meaningDetails: IMeaningDetails
}

function MeaningItem({meaningDetails}: MeaningItemProps): React.JSX.Element {
  const {words, sources, ...meaning} = meaningDetails
  return (
    <div className="meaningContainer">
      <div className="meaningItem">
        <div>
          <div className='words'>{words.flatMap((w) => `"${w.name}"`).join(', ')}</div>
          <div>{actualityOfInfo(sources)}</div>
        </div>
        <div>{meaning.explanation}</div>
      </div>
      <div className='sourcesList'>{sources.map((source, key)=> <SourceItem key={key} sourceDetails={source}/>)}</div>
    </div>
  )
}

export default MeaningItem
