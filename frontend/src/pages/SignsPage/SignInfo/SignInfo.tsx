import './SignInfo.css'
import { meaningCountText, mergeYearText } from '@src/utils/namesHelpers'
import type { ISignSimple } from '@src/models/sign.model'
import PinIcon from '@src/assets/icons/PinIcon'
import CalendarIcon from '@src/assets/icons/CalendarIcon'
import PillList from '@src/components/PillList/PillList'

interface SignInfoProps {
  signSimple: ISignSimple
}

function SignInfo({ signSimple }: SignInfoProps): React.JSX.Element {
  const {meaningsCount, regions, years, words, notes} = signSimple

  return (
    <div className="signInfo">
      <div className='additionalInfo'>{meaningCountText(meaningsCount)}</div>
      <div className='additionalInfo details'><PinIcon/> {regions.length > 0 ? regions.join(', ') : 'Brak regionów'}</div>
      <div className='additionalInfo details'><CalendarIcon/> {mergeYearText(years)}</div>
      {words.length > 0 ? <PillList textArray={words}/> : <div className='additionalInfo'>Brak słów</div>}
      <div>{notes}</div>
    </div>
  )
}

export default SignInfo
