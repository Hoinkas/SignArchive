import PillList from '@src/components/PillList/PillList'
import './SourceItem.css'
import type { ISourceDetails } from '@src/models/source.model'
import PinIcon from '@src/assets/icons/PinIcon'
import { mergeYearText } from '@src/utils/namesHelpers'

interface SourceItemProps {
  sourceDetails: ISourceDetails
}

function SourceItem({sourceDetails}: SourceItemProps): React.JSX.Element {
  const {reference, regions, ...source} = sourceDetails
  const regionsNames = regions.map((r) => r.name)
  const {yearStart, yearEnd} = source
  const yearStartEnd = {yearStart, yearEnd}

  return (
    <div className="sourceItem">
      <div className='yearsRegions'>
        <PillList textArray={[mergeYearText(yearStartEnd)]}/>
        <div className='additionalInfo details'><PinIcon/> {regionsNames.length > 0 ? regionsNames.join(', ') : 'Brak regionów'}</div>
      </div>
      <div>{source.context}</div>
      <div className='additionalInfo'>Źródło: {reference.name}</div>
    </div>
  )
}

export default SourceItem
