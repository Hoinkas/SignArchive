import './SignItem.css'
import type { ISignSimple } from '@src/models/sign.model'
import MediaPlayer from './MediaPlayer/MediaPlayer'
import SignInfo from '../../SignInfo/SignInfo'
import { useSign } from '@src/hooks/SignContext/useSign'

interface SignItemProps {
  signSimple: ISignSimple
}

function SignItem({ signSimple }: SignItemProps): React.JSX.Element {
  const {openCloseSidePanel} = useSign()

  return (
    <div className="signContainer">
      <MediaPlayer media={signSimple.media} />
      <div className='signContent' onClick={() => openCloseSidePanel(signSimple.id)}>
        <SignInfo signSimple={signSimple}/>
        <div className='additionalInfo flexEnd timelineInfo'>Zobacz oś czasu {'>'}</div>
      </div>
    </div>
  )
}

export default SignItem
