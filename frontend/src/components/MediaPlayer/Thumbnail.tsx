import PlayIcon from '@src/assets/icons/PlayIcon'
import './Thumbnail.css'
interface ThumbnailProps {
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>
}

function Thumbnail({setIsClicked}: ThumbnailProps): React.JSX.Element {
  return (
    <div className="thumbnail" onClick={() => setIsClicked(true)}>
      <PlayIcon/>
    </div>
  )
}

export default Thumbnail
