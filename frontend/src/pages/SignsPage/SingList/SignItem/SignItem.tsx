import './SignItem.css'
import type { ISignSimple } from '@src/models/sign.model'
import MediaPlayer from './MediaPlayer/MediaPlayer'
import SignInfo from './SignInfo/SignInfo'

interface SignItemProps {
  signSimple: ISignSimple
}

function SignItem({ signSimple }: SignItemProps): React.JSX.Element {
  return (
    <div className="signContainer">
      <MediaPlayer media={signSimple.media} />
      <SignInfo signSimple={signSimple}/>
    </div>
  )
}

export default SignItem
