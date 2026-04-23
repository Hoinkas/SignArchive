import CalendarIcon from '@src/assets/icons/CalendarIcon'
import PinIcon from '@src/assets/icons/PinIcon'
import PillList from '@src/components/PillList/PillList'
import { meaningCountText, mergeYearText } from '@src/utils/namesHelpers'
import './DetailsSignInfo.css'
import type { ISignSimple } from '@src/models/sign.model'

interface DetailsSignInfoProps {
  simpleSign: ISignSimple
  showMeaningCount?: boolean
  showRegions?: boolean
  showYears?: boolean
  showWords?: boolean
  showNotes?: boolean
}

function DetailsSignInfo(props: DetailsSignInfoProps): React.JSX.Element {
  const {showMeaningCount, showRegions, showYears, showWords, showNotes, simpleSign} = props
  const {meaningsCount, words, notes, regions, years} = simpleSign

  return (
    <div className="signInfo">
      {showMeaningCount && <div className='additionalInfo'>{meaningCountText(meaningsCount)}</div>}
      {showRegions && <div className='additionalInfo details'><PinIcon/> {regions.length > 0 ? regions.join(', ') : 'Brak regionów'}</div>}
      {showYears && <div className='additionalInfo details'><CalendarIcon/> {mergeYearText(years)}</div>}
      {showWords && (words.length > 0 ? <PillList textArray={words}/> : <div className='additionalInfo'>Brak słów</div>)}
      {showNotes && <div>{notes}</div>}
    </div>
  )
}

export default DetailsSignInfo
