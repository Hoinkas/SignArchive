import type { IMeaningDetails } from '@src/models/meaning.model'
import './MeaningItem.css'
import SourceItem from '../SourceItem/SourceItem'
import { currencyOfSources } from '@src/utils/currencyOfSources'
import PillList from '@src/components/PillList/PillList'

interface MeaningItemProps {
  meaningDetails: IMeaningDetails
}

function MeaningItem({meaningDetails}: MeaningItemProps): React.JSX.Element {
  const {words, sources, ...meaning} = meaningDetails

  return (
    <div className="meaningContainer">
      <div className="meaningItem">
        <div className='wordsContainer'>
          <div className='words'>{words.flatMap((w) => `"${w.name}"`).join(' ')}</div>
          <PillList textArray={[currencyOfSources(sources)]}/>
        </div>
        <div>{meaning.explanation}</div>
      </div>
      <div className='sourcesList'>{sources.map((source, key)=>
        <SourceItem key={key} sourceDetails={source}/>
      )}</div>
    </div>
  )
}

export default MeaningItem
