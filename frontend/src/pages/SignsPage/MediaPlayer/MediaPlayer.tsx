import type { IMedia } from '@src/models/media.model'
import './MediaPlayer.css'
import ImageItem from './ImageItem'
import VideoItem from './VideoItem'

interface MediaPlayerProps {
  media: IMedia
  isDetails?: boolean
}

function MediaPlayer({ media, isDetails = false }: MediaPlayerProps): React.JSX.Element {
  const isImage = media.mediaType.startsWith('image/')

  return (
    <div className={`mediaWrapper ${isDetails && 'isDetails'}`}>
      {isImage ? <ImageItem media={media} isDetails={isDetails}/>
        : <VideoItem media={media} isDetails={isDetails}/>}
    </div>
  )
}

export default MediaPlayer
