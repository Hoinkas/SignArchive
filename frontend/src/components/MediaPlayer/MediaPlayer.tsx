import type { IMedia } from '@src/models/media.model'
import './MediaPlayer.css'

interface MediaPlayerProps {
  media: IMedia
}

function MediaPlayer({ media }: MediaPlayerProps): React.JSX.Element {
  const isImage = media.mediaType.startsWith('image/')

  return (
    <div className="mediaWrapper">
      {isImage ? (
        <img src={media.url} className="imageBox" alt={media.name} />
      ) : (
        <iframe src={`${media.url}?autoplay=0`} className="videoBox" allowFullScreen/>
      )}
    </div>
  )
}

export default MediaPlayer
