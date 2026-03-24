import './ComparsionWindow.css'
import MediaPlayer from '../../MediaPlayer/MediaPlayer'
import { RelationType, SignRelation, SignWithSourceSignerMediaFile } from '@shared/types'

interface ComparsionWindowProps {
  activeSigns: SignWithSourceSignerMediaFile[]
  handleCloseWindow: () => void
}

function ComparsionWindow(props: ComparsionWindowProps): React.JSX.Element {
  const { activeSigns, handleCloseWindow } = props

  const handleSignComparsion = (relationType: RelationType): void => {
    const signRelation: Omit<SignRelation, 'createdAt'> = {
      tailSignId: activeSigns[0].sign.id,
      headSignId: activeSigns[1].sign.id,
      relationType
    }
    window.api.signs_relations.create(signRelation)

    handleCloseWindow()
    // window.api.signs_relations.create(signRelation).then(setWordDetails)
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
