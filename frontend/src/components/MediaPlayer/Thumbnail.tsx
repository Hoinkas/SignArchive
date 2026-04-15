import PlayIcon from '@src/assets/icons/PlayIcon'
import './Thumbnail.css'
import type { IMedia } from '@src/models/media.model'

interface ThumbnailProps {
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>
  media: IMedia
}

function Thumbnail({setIsClicked, media}: ThumbnailProps): React.JSX.Element {
  const imageUrl = media.url.replace('.720p.mp4', '.jpg')

  return (
    <div className="thumbnail" onClick={() => setIsClicked(true)} style={{backgroundImage: `url("${imageUrl}")`}}>
      <PlayIcon/>
    </div>
  )
}

export default Thumbnail
