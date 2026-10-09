import './SignItem.css'
import type { ISignSimple } from '@src/models/sign.model'
import MediaPlayer from '../../../../components/MediaPlayer/MediaPlayer'
import { mergeYearText } from '@src/utils/namesHelpers'

interface SignItemProps {
  signSimple: ISignSimple
}

function SignItem({ signSimple }: SignItemProps): React.JSX.Element {
  const {media, words, regions, years, uniqueNumber} = signSimple

  const paddedNumber = (uniqueNumber + "").padStart(4, "0");

  return (
    <div className="signContainer additionalInfo">
      <MediaPlayer media={media} />
      <div className='signContent'>
        <div className='details'>
          <div>SŁOWA: {words.length > 0 ? words.join(', ') : '-'}</div>
          <div>REGIONY: {regions.length > 0 ?  regions.join(', ') : '-'}</div>
        </div>
        <div className='yearDetails'>
          <div>LATA: {mergeYearText(years)}</div>
        </div>
        <div className='detailsEnd'>
          <div>#{paddedNumber}</div>
          <div>Szczegóły {'>'}</div>
        </div>
      </div>
    </div>
  )
}

export default SignItem
