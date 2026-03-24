import './VariantBox.css'
import MediaBox from './MediaPlayer/MediaPlayer'
import PillBoxList from '../../PillBoxList/PillBoxList'
import { SignWithSourceSignerMediaFile } from '@shared/types'

interface VariantBoxProps {
  sign: SignWithSourceSignerMediaFile
}

function VariantBox({ sign }: VariantBoxProps): React.JSX.Element {
  const pillText: string[] = []

  const source = sign.source
  const signer = sign.signer
  const mediaFile = sign.mediaFile
  const notes = sign.sign.notes ?? ''
  const signerNameSurname = signer ? signer.name + signer.surname : 'Migacz nieznany'

  return (
    <div className="variantBox">
      {sign.mediaFile && <MediaBox mediaFile={sign.mediaFile} />}
      <div className="variantDetails">
        <div>{source?.name} · {mediaFile?.year}</div>
        <div>{signerNameSurname}</div>
        <h4>{notes}</h4>
        <PillBoxList textArray={pillText} />
      </div>
    </div>
  )
}

export default VariantBox
