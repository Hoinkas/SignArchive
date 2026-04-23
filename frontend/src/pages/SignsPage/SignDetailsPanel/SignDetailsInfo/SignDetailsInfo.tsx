import { useSign } from '@src/hooks/SignContext/useSign'
import MediaPlayer from '../../MediaPlayer/MediaPlayer'
import { useState } from 'react'
import SignFormsActions from './SignFormsActions'
import DetailsSignInfo from '@src/pages/SignsPage/DetailsSignInfo/DetailsSignInfo'
import Loader from '@src/components/Loader/Loader'

function SignDetailsInfo(): React.JSX.Element {
  const { sign, simpleSign } = useSign()
  const [isHovering, setIsHovering] = useState<boolean>(false)

  if (!sign || !simpleSign) return <Loader/>

  return (
    <div
      style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-6)'}}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <MediaPlayer media={sign.media} isDetails/>
      <div style={{display: 'inline-flex', gap: 'var(--space-6)', justifyContent: 'space-between'}}>
        <DetailsSignInfo simpleSign={simpleSign} showRegions showYears showNotes/>
        <SignFormsActions sign={sign} isHovering={isHovering}/>
      </div>
    </div>
  )
}

export default SignDetailsInfo
