import './VariantBox.css'
import MediaPlayer from '../../MediaPlayer/MediaPlayer'
import PillBoxList from '../../PillBoxList/PillBoxList'
import { SignWithSourceSignerMediaFile } from '@shared/types'
import { Dispatch, SetStateAction } from 'react'

interface VariantBoxProps {
  sign: SignWithSourceSignerMediaFile
  isComparsionActive: boolean
  activeSigns: SignWithSourceSignerMediaFile[]
  setActiveSigns: Dispatch<SetStateAction<SignWithSourceSignerMediaFile[]>>
}

function VariantBox(props: VariantBoxProps): React.JSX.Element {
  const { sign, isComparsionActive, activeSigns, setActiveSigns } = props

  const pillText: string[] = []

  const source = sign.source
  const signer = sign.signer
  const mediaFile = sign.mediaFile
  const notes = sign.sign.notes ?? ''
  const signerNameSurname = signer ? signer.name + ' ' + signer.surname : 'Migacz nieznany'

  const isChecked = activeSigns.some((s) => s.sign.id === sign.sign.id)

  const handleOnClick = (): void => {
    if (isChecked) {
      setActiveSigns((prevState) =>
        prevState.filter((activeSign) => activeSign.sign.id.toString() !== sign.sign.id.toString())
      )
    } else {
      setActiveSigns((prevState) => [...prevState, sign])
    }
  }

  return (
    <div className={isChecked ? 'variantBox active' : 'variantBox'}>
      {sign.mediaFile && <MediaPlayer mediaFile={sign.mediaFile} />}
      <div className="variantDetails">
        <div>{source?.name} · {mediaFile?.year}</div>
        <div>{signerNameSurname}</div>
        <h4>{notes}</h4>
        <div className="bottomBox">
          <PillBoxList textArray={pillText} />
          {isComparsionActive && (
            <button onClick={() => handleOnClick()}>{isChecked ? 'odznacz' : 'zaznacz'}</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default VariantBox
