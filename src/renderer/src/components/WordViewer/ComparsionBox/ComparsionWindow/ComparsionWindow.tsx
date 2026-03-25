import './ComparsionWindow.css'
import MediaPlayer from '../../MediaPlayer/MediaPlayer'
import { RelationType, SignWithSourceSignerMediaFile } from '@shared/types'

interface ComparsionWindowProps {
  activeSigns: SignWithSourceSignerMediaFile[]
  handleCloseWindow: () => void
}

function ComparsionWindow(props: ComparsionWindowProps): React.JSX.Element {
  const { activeSigns, handleCloseWindow } = props

  const handleSignComparsion = (relationType: RelationType): void => {
    window.api.signs_relations.create({
      tailSignId: activeSigns[0].sign.id,
      headSignId: activeSigns[1].sign.id,
      relationType,
      meaningId: activeSigns[0].meaningId
    })

    window.api.signs_relations.create({
      tailSignId: activeSigns[0].sign.id,
      headSignId: activeSigns[1].sign.id,
      relationType,
      meaningId: activeSigns[1].meaningId
    })

    handleCloseWindow()
  }

  return (
    <div className="comparsionWindow">
      <button className="closeButton" type="reset" onClick={() => handleCloseWindow()}>
        x
      </button>
      <div className="mediaAndButtons">
        <div className="mediaItem">
          <MediaPlayer mediaFile={activeSigns[0].mediaFile} />
        </div>
        <div className="actionButtons">
          <button onClick={() => handleSignComparsion('duplicate')}> duplikat </button>
          <button onClick={() => handleSignComparsion('variant')}> wariant </button>
          <button onClick={() => handleSignComparsion('homonym')}> homonym </button>
        </div>
        <div className="mediaItem">
          <MediaPlayer mediaFile={activeSigns[1].mediaFile} />
        </div>
      </div>

    </div>
  )
}

export default ComparsionWindow
