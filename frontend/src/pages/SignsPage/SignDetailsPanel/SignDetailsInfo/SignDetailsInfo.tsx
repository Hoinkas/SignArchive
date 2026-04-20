import { useSign } from '@src/hooks/SignContext/useSign'
import MediaPlayer from '../../SingList/SignItem/MediaPlayer/MediaPlayer'
import SignInfo from '../../SignInfo/SignInfo'
import { useState } from 'react'
import SignFormsActions from './SignFormsActions'

function SignDetailsInfo(): React.JSX.Element {
  const { sign, simpleSign } = useSign()
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <div
      style={{display: 'inline-flex', justifyContent: 'space-between'}}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div style={{display: 'inline-flex', gap: 'var(--space-6)'}}>
        <MediaPlayer media={sign.media}/>
        <SignInfo signSimple={simpleSign}/>
      </div>
      <SignFormsActions sign={sign} isHovering={isHovering}/>
    </div>
  )
}

export default SignDetailsInfo
