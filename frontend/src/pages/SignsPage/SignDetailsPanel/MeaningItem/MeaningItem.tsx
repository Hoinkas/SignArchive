import type { IMeaningDetails } from '@src/models/meaning.model'
import './MeaningItem.css'
import SourceItem from './SourceItem/SourceItem'
import { currencyOfSources } from '@src/utils/currencyOfSources'
import PillList from '@src/components/PillList/PillList'
import type { ISourceDetails } from '@src/models/source.model'
import MeaningDetails from './MeaningDetails/MeaningDetails'
import ArrowUpIcon from '@src/assets/icons/ArrowUpIcon'
import ArrowDownIcon from '@src/assets/icons/ArrowDownIcon'
import { useState } from 'react'

function sortByYears(a: ISourceDetails, b: ISourceDetails): number {
  const newerYearA =  a.yearEnd ?? a.yearStart
  const newerYearB =  b.yearEnd ?? b.yearStart

  if (!newerYearA && !newerYearB) return 0
  if (!newerYearA) return 1
  if (!newerYearB) return -1
  return newerYearA < newerYearB ? 1 : -1
}

interface MeaningItemProps {
  meaning: IMeaningDetails
}

function MeaningItem({meaning}: MeaningItemProps): React.JSX.Element {
  const {words, sources} = meaning
  const [isSourcesListOpen, setIsSourcesListOpen] = useState<boolean>(false)

  function handleClick(): void {
    setIsSourcesListOpen((prevState) => !prevState)
  }

  console.log(sources)

  return (
    <div className="meaningContainer">
      <div className="meaningItem" onClick={() => handleClick()}>
        <div style={{display: 'inline-flex', justifyContent: 'space-between'}}>
          <div className='words'>{words.flatMap((w) => `"${w.name}"`).join(' ')}</div>
          <div style={{display: 'inline-flex', gap: 'var(--space-4)'}}>
            <PillList textArray={[currencyOfSources(sources)]}/>
            <div className='additionalInfo openSourcesDropdown'> {isSourcesListOpen ? <ArrowUpIcon /> : <ArrowDownIcon />} </div>
          </div>
        </div>
        <MeaningDetails meaning={meaning}/>
      </div>
      <div className={`sourcesList ${isSourcesListOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {sources.sort(sortByYears).map((source, key) => (
            <SourceItem key={key} meaningId={meaning.id} sourceDetails={source} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MeaningItem
