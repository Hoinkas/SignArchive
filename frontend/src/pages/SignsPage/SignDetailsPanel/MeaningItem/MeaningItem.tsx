import type { IMeaningDetails } from '@src/models/meaning.model'
import './MeaningItem.css'
import SourceItem from './SourceItem/SourceItem'
import { currencyOfSources } from '@src/utils/currencyOfSources'
import PillList from '@src/components/PillList/PillList'
import { useState } from 'react'
import SourceForm from '@src/components/Form/Forms/SourceForm'
import ActionButton from '@src/components/ActionButton/ActionButton'
import type { ISourceDetails } from '@src/models/source.model'

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
  const {words, sources, ...meaning} = meaningDetails
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <div className="meaningContainer">
      <div className="meaningItem">
        <div className='wordsContainer'>
          <div className='words'>{words.flatMap((w) => `"${w.name}"`).join(' ')}</div>
          <PillList textArray={[currencyOfSources(sources)]}/>
        </div>
        <div>
          {meaning.explanation}
          {isFormOpen ?
            <SourceForm meaningId={meaning.id} formType='add' setIsFormOpen={setIsFormOpen}/> :
            <ActionButton text="Dodaj źródło" buttonAction={() => setIsFormOpen(true)}/>
          }
        </div>
      </div>
      <div className='sourcesList'>
        {sources.sort(sortByYears).map((source, key)=><SourceItem key={key} sourceDetails={source}/>)}
      </div>
    </div>
  )
}

export default MeaningItem
