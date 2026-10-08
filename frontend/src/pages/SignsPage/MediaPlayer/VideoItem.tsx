import type { IMedia } from '@src/models/media.model'
import './MediaPlayer.css'
import { useEffect, useRef, useState} from 'react'
import Thumbnail from './Thumbnail'
import { BASE_URL } from '@src/utils/urlHelper'

interface MediaPlayerProps {
  media: IMedia
  isDetails: boolean
}

function VideoItem({ media, isDetails }: MediaPlayerProps): React.JSX.Element {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [prevMedia, setPrevMedia] = useState(media)
  const videoRef = useRef<HTMLVideoElement>(null)

  if (prevMedia !== media) {
    setPrevMedia(media)
    setIsClicked(false)
  }

  useEffect(() => {
    if (isClicked && videoRef.current) {
      videoRef.current.play()
    }
  }, [isClicked])

  const videoUrl = `${BASE_URL}${media.videoUrl}`
  const thumbnailUrl = `${BASE_URL}${media.thumbnailUrl}`

  return (
    <div className={`videoContainer ${isDetails && 'isDetails'}`}>
      {isClicked ?
        <video key={videoUrl} ref={videoRef} className="videoBox" controls muted>
          <source src={videoUrl} type={'video/mp4'} />
        </video>
        : <Thumbnail setIsClicked={setIsClicked} media={{ ...media, thumbnailUrl: thumbnailUrl }} />
      }
    </div>
  )
}

export default VideoItem
