import './MediaPlayer.css'
import type { SignFile } from '@shared/types'

interface MediaPlayerProps {
  file: SignFile
}

function MediaPlayer({ file }: MediaPlayerProps): React.JSX.Element {
  const isImage = file.mediaType.startsWith('image/')

  return (
    <div className="mediaWrapper">
      {isImage ? (
        <img src={file.url} className="imageBox" alt={file.name} />
      ) : (
        <iframe src={file.url} className="videoBox" allowFullScreen/>
      )}
    </div>
  )
}

export default MediaPlayer
