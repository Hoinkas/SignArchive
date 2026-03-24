import './MediaPlayer.css'
import { MediaFile } from '@shared/types'
import ReactPlayer from 'react-player'

interface MediaPlayerProps {
  mediaFile: MediaFile
}

function MediaPlayer({ mediaFile }: MediaPlayerProps): React.JSX.Element {
  const getSrc = (filePath: string): string => {
    if (filePath.startsWith('file:///')) {
      const path = decodeURIComponent(filePath.replace('file://', ''))
      return 'media://' + path.split('/').map(encodeURIComponent).join('/')
    }

    if (!filePath) return ''

    const withoutLeadingSlash = filePath.replace(/^\//, '')
    return 'media://' + withoutLeadingSlash.split('/').map(encodeURIComponent).join('/')
  }

  const isImage = ['jpg', 'png'].includes(mediaFile.fileType)

  return (
    <div className={'mediaWrapper'}>
      {isImage ? (
        <img src={getSrc(mediaFile.filePath)} className="imageBox" />
      ) : (
        <div className="videoBox">
          <ReactPlayer
            src={getSrc(mediaFile.filePath)}
            controls={true}
            width="100%"
            height="100%"
            muted={true}
          />
        </div>
      )}
    </div>
  )
}

export default MediaPlayer
