import './SignItem.css'
import type { ISignSimple } from '@src/models/sign.model'
import MediaPlayer from '../../../../components/MediaPlayer/MediaPlayer'
import { mergeYearToText } from '@src/utils/namesHelpers'
import { useSign } from '@src/hooks/SignContext/useSign'
import { renameWordsDuplicates } from '@src/utils/removeDuplicates'

interface SignItemProps {
  signSimple: ISignSimple
}

function SignItem({ signSimple }: SignItemProps): React.JSX.Element {
  const {openCloseSidePanel} = useSign();
  const {media, words, regions, years, uniqueNumber} = signSimple

  const paddedNumber = (uniqueNumber + "").padStart(4, "0");
  const uniqueWords = renameWordsDuplicates(words).map(w => w.name)

  return (
    <div className="signContainer additionalInfo">
      <MediaPlayer media={media} />
      <div className='signContent' onClick={() => openCloseSidePanel(signSimple.uniqueNumber)}>
        <div className='details'>
          <div>SŁOWA: {uniqueWords.length > 0 ? uniqueWords.join(', ') : '-'}</div>
          <div>REGIONY: {regions.length > 0 ?  regions.map((r) => r.name).join(', ') : '-'}</div>
          <div>LATA: {mergeYearToText(years)}</div>
        </div>
        <div className='detailsEnd'>
          <div>#{paddedNumber}</div>
          <div className='clickable'>SZCZEGÓŁY &gt;</div>
        </div>
      </div>
    </div>
  )
}

export default SignItem
