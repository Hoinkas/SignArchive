import { Dispatch, SetStateAction } from 'react'
import './ComparsionWindow.css'
import MediaPlayer from '../../MediaPlayer/MediaPlayer'
import { SignWithSourceSignerMediaFile } from '@shared/types'

interface ComparsionWindowProps {
  activeSigns: SignWithSourceSignerMediaFile[]
  setIsComparsionWindowOpen: Dispatch<SetStateAction<boolean>>
}

function ComparsionWindow(props: ComparsionWindowProps): React.JSX.Element {
  const { activeSigns, setIsComparsionWindowOpen } = props

  return (
    <div className="comparsionWindow">
      <MediaPlayer mediaFile={activeSigns[0].mediaFile} />
      <div className="actionButtons">
        <button> duplikat </button>
        <button> wariant </button>
        <button> homonym </button>
      </div>
      <MediaPlayer mediaFile={activeSigns[1].mediaFile} />
      <button onClick={() => setIsComparsionWindowOpen(false)}>x</button>
    </div>
  )
}

export default ComparsionWindow
