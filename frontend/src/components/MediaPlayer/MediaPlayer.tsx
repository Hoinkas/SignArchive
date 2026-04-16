import type { IMedia } from '@src/models/media.model'
import './MediaPlayer.css'
import { useState } from 'react'
import Thumbnail from './Thumbnail'

interface MediaPlayerProps {
  media: IMedia
}

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

function MediaPlayer({ media }: MediaPlayerProps): React.JSX.Element {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [prevMedia, setPrevMedia] = useState(media)
  const isImage = media.mediaType.startsWith('image/')

  if (prevMedia !== media) {
    setPrevMedia(media)
    setIsClicked(false)
  }

  const fullUrl = media.url.startsWith('http') ? media.url : `${BASE_URL}${media.url}`

  return (
    <div className="mediaWrapper">
      {isImage ? (
        <img src={fullUrl} className="imageBox" alt={media.name} />
      ) : (
        <div className="videoContainer">
          <video key={fullUrl} className="videoBox" controls muted controlsList="novolume" ref={(el) => {
            if (el && isClicked) el.play()
          }}>
            <source src={fullUrl} type={media.mediaType} />
          </video>
          {!isClicked && (
            <div className="thumbnailOverlay">
              <Thumbnail setIsClicked={setIsClicked} media={{ ...media, url: fullUrl }} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MediaPlayer
