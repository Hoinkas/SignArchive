import type { IMedia } from '@src/models/media.model'
import './MediaPlayer.css'
import { useState } from 'react'
import Thumbnail from './Thumbnail'

interface MediaPlayerProps {
  media: IMedia
}

function MediaPlayer({ media }: MediaPlayerProps): React.JSX.Element {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const isImage = media.mediaType.startsWith('image/')

  return (
    <div className="mediaWrapper">
      {isImage ? (
        <img src={media.url} className="imageBox" alt={media.name} />
      ) : (
        isClicked ? <iframe src={media.url} className="videoBox" allowFullScreen/> : <Thumbnail setIsClicked={setIsClicked}/>
      )}
    </div>
  )
}

export default MediaPlayer
