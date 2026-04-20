import type { IMeaningDetails } from '@src/models/meaning.model'
import './MeaningItem.css'
import SourceItem from './SourceItem/SourceItem'
import { currencyOfSources } from '@src/utils/currencyOfSources'
import PillList from '@src/components/PillList/PillList'
import type { ISourceDetails } from '@src/models/source.model'
import MeaningDetails from './MeaningDetails/MeadningDetails'

function sortByYears(a: ISourceDetails, b: ISourceDetails): number {
  const newerYearA =  a.yearEnd ?? a.yearStart
  const newerYearB =  b.yearEnd ?? b.yearStart

  if (!newerYearA && !newerYearB) return 0
  if (!newerYearA) return 1
  if (!newerYearB) return -1
  return newerYearA < newerYearB ? 1 : -1
}

interface MeaningItemProps {
  meaningDetails: IMeaningDetails
}

function MeaningItem({meaningDetails}: MeaningItemProps): React.JSX.Element {
  const {words, sources} = meaningDetails

  return (
    <div className="meaningContainer">
      <div className="meaningItem">
        <div style={{display: 'inline-flex', justifyContent: 'space-between'}}>
          <div className='words'>{words.flatMap((w) => `"${w.name}"`).join(' ')}</div>
          <PillList textArray={[currencyOfSources(sources)]}/>
        </div>
        <MeaningDetails meaning={meaningDetails}/>
      </div>
      <div className='sourcesList'>
        {sources.sort(sortByYears).map((source, key)=><SourceItem key={key} sourceDetails={source}/>)}
      </div>
    </div>
  )
}

export default MeaningItem
