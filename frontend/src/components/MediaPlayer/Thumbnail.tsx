import PlayIcon from '@src/assets/icons/PlayIcon'
import './Thumbnail.css'

interface ThumbnailProps {
  thumbnailUrl: string
  onPlay: () => void
}

function Thumbnail({ thumbnailUrl, onPlay }: ThumbnailProps): React.JSX.Element {
  return (
    <button
      type="button"
      className="thumbnail"
      onClick={onPlay}
      style={{ '--thumbnailImg': `url("${thumbnailUrl}")` } as React.CSSProperties}
    >
      <PlayIcon />
    </button>
  )
}

export default Thumbnail
