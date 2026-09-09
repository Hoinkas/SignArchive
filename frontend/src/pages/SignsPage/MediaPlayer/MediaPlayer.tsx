import type { IMedia } from '@src/models/media.model'
import './MediaPlayer.css'
import { useEffect, useRef, useState } from 'react'
import Thumbnail from './Thumbnail'
import { BASE_URL } from '@src/utils/urlHelper'

interface MediaPlayerProps {
  media: IMedia
  isDetails?: boolean
}

function MediaPlayer({ media, isDetails = false }: MediaPlayerProps): React.JSX.Element {
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

  const fullUrl = media.videoUrl.startsWith('http') ? media.videoUrl : `${BASE_URL}${media.videoUrl}`
  const thumbnailUrl = media.videoUrl.startsWith('http') ? media.thumbnailUrl : `${BASE_URL}${media.thumbnailUrl}`

  return (
    <div className={`mediaWrapper ${isDetails && 'isDetails'}`}>
      {isImage ? (
        <img src={fullUrl} className={`imageBox ${isDetails && 'isDetails'}`} alt={media.description} />
      ) : (<div className={`videoContainer ${isDetails && 'isDetails'}`}>
              {isClicked ?
                <video key={fullUrl} ref={videoRef} className="videoBox" controls muted>
                  <source src={fullUrl} type={media.mediaType} />
                </video>
              : <div className='thumbnailOverlay'>
                  <Thumbnail setIsClicked={setIsClicked} media={{ ...media, thumbnailUrl: thumbnailUrl }} />
                </div>
            }
          </div>)
      }
    </div>
  )
}

export default MediaPlayer
