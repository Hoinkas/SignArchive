import PlayIcon from '@src/assets/icons/PlayIcon'
import './Thumbnail.css'
import type { IMedia } from '@src/models/media.model'

interface ThumbnailProps {
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>
  media: IMedia
}

function Thumbnail({setIsClicked, media}: ThumbnailProps): React.JSX.Element {
  const image = media.thumbnailUrl ?? media.videoUrl
  return (
    <div className="thumbnail" onClick={() => setIsClicked(true)} style={{backgroundImage: `url("${image}")`}}>
      <PlayIcon/>
    </div>
  )
}

export default Thumbnail
