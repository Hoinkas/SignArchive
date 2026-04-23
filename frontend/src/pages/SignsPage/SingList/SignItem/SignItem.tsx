import './SignItem.css'
import type { ISignSimple } from '@src/models/sign.model'
import MediaPlayer from '../../MediaPlayer/MediaPlayer'
import { useSign } from '@src/hooks/SignContext/useSign'
import DetailsSignInfo from '@src/pages/SignsPage/DetailsSignInfo/DetailsSignInfo'

interface SignItemProps {
  signSimple: ISignSimple
}

function SignItem({ signSimple }: SignItemProps): React.JSX.Element {
  const {openCloseSidePanel} = useSign()

  return (
    <div className="signContainer">
      <MediaPlayer media={signSimple.media} />
      <div className='signContent' onClick={() => openCloseSidePanel(signSimple.id)}>
        <DetailsSignInfo simpleSign={signSimple} showMeaningCount showRegions showYears showWords/>
        <div className='additionalInfo flexEnd timelineInfo'>Zobacz oś czasu {'>'}</div>
      </div>
    </div>
  )
}

export default SignItem
