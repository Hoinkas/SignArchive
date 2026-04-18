import './SignItem.css'
import { meaningCountText, mergeYearText } from '@src/utils/namesHelpers'
import type { ISignSimple } from '@src/models/sign.model'
import { useState } from 'react'
import PinIcon from '@src/assets/icons/PinIcon'
import CalendarIcon from '@src/assets/icons/CalendarIcon'
import PillList from '@src/components/PillList/PillList'
import MediaPlayer from './MediaPlayer/MediaPlayer'

interface SignItemProps {
  signSimple: ISignSimple
}

function SignItem({ signSimple }: SignItemProps): React.JSX.Element {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const {meaningsCount, regions, years, words, media} = signSimple

  return (
    <div className="signContainer"  onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
      <MediaPlayer media={media} />
      <div className="signInfo">
        <div className='additionalInfo'>{meaningCountText(meaningsCount)}</div>
        <div className='details'><PinIcon/> {regions.length > 0 ? regions.join(', ') : 'Brak regionów'}</div>
        <div className='details'><CalendarIcon/> {mergeYearText(years)}</div>
        <PillList textArray={words}/>
      </div>
    </div>
  )
}

export default SignItem
