import type { IMedia } from '@src/models/media.model'
import './MediaPlayer.css'
import { BASE_URL } from '@src/utils/urlHelper'

interface ImageItemProps {
  media: IMedia
  isDetails: boolean
}

function ImageItem({ media, isDetails }: ImageItemProps): React.JSX.Element {
  return (
    <img src={`${BASE_URL}${media.videoUrl}`} className={`imageBox ${isDetails ? 'isDetails' : ''}`} alt={media.description} />
  )
}

export default ImageItem
