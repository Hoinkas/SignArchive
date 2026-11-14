import type { IMedia } from '@src/models/media.model'
import './MediaPlayer.css'
import VideoItem from './VideoItem'

interface MediaPlayerProps {
  media: IMedia[]
  isDetails?: boolean
}

function MediaPlayer({ media, isDetails = false }: MediaPlayerProps): React.JSX.Element {
  return (
    <div className={`mediaWrapper${isDetails ? ' isDetails' : ''}`}>
      {/* TODO Handle more videos for one sign */}
      <VideoItem media={media[0]}/>
    </div>
  )
}

export default MediaPlayer
