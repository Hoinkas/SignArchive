import type { IMedia } from '@src/models/media.model'
import './MediaPlayer.css'
import { useEffect, useRef, useState } from 'react'
import Thumbnail from './Thumbnail'
import { BASE_URL } from '@src/utils/urlHelper'

interface MediaPlayerProps {
  media: IMedia
}

function MediaPlayer({ media }: MediaPlayerProps): React.JSX.Element {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [prevMedia, setPrevMedia] = useState(media)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isImage = media.mediaType.startsWith('image/')

  if (prevMedia !== media) {
    setPrevMedia(media)
    setIsClicked(false)
  }

  useEffect(() => {
    if (isClicked && videoRef.current) {
      videoRef.current.play()
    }
  }, [isClicked])

  const fullUrl = media.url.startsWith('http') ? media.url : `${BASE_URL}${media.url}`

  return (
    <div className="mediaWrapper">
      {isImage ? (
        <img src={fullUrl} className="imageBox" alt={media.name} />
      ) : (
        <div className="videoContainer">
          <video key={fullUrl} ref={videoRef} className="videoBox" controls muted controlsList="novolume">
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
