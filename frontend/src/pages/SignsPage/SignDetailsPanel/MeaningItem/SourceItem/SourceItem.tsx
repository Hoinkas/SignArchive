import PillList from '@src/components/PillList/PillList'
import './SourceItem.css'
import type { ISourceDetails } from '@src/models/source.model'
import PinIcon from '@src/assets/icons/PinIcon'
import { mergeYearText } from '@src/utils/namesHelpers'
import ReferenceIconAction from './ReferenceIconAction/ReferenceIconAction'
import SourceFormsActions from './SourceFormsActions'
import { useState } from 'react'

interface SourceItemProps {
  meaningId: string
  sourceDetails: ISourceDetails
}

function SourceItem({meaningId, sourceDetails}: SourceItemProps): React.JSX.Element {
  const {reference, regions, ...source} = sourceDetails
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const {yearStart, yearEnd, context} = source
  const yearStartEnd = {yearStart, yearEnd}

  const regionsNames = regions.map((r) => r.name)

  return (
    <div className='sourceContainer' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="sourceItem">
        <div className='yearsRegions'>
          <PillList textArray={[mergeYearText(yearStartEnd)]}/>
          <div className='additionalInfo details'><PinIcon/> {regionsNames.length > 0 ? regionsNames.join(', ') : 'Brak regionów'}</div>
        </div>
        <div>{context}</div>
        <div className='additionalInfo referencesBox'>
          <p style={{height: 'fit-content'}}>Źródło: {reference.name}</p>
          <ReferenceIconAction reference={reference} />
        </div>
      </div>
      <SourceFormsActions meaningId={meaningId} source={sourceDetails} isHovering={isHovering}/>
    </div>
  )
}

export default SourceItem

