import type { IMedia } from '@src/models/media.model'
import './MediaPlayer.css'
import { useState} from 'react'
import Thumbnail from './Thumbnail'
import { BASE_URL } from '@src/utils/urlHelper'

interface MediaPlayerProps {
  media: IMedia
}

function VideoItem({ media }: MediaPlayerProps): React.JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false)

  const videoUrl = `${BASE_URL}${media.videoUrl}`
  const thumbnailUrl = `${BASE_URL}${media.thumbnailUrl}`

  return (
    <div className="videoContainer">
      {isPlaying ? (
        <video className="videoBox" src={videoUrl} controls muted autoPlay playsInline />
      ) : (
        <Thumbnail thumbnailUrl={thumbnailUrl} onPlay={() => setIsPlaying(true)} />
      )}
    </div>
  )
}

export default VideoItem
