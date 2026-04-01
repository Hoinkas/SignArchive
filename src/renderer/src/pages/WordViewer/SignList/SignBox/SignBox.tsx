import './SignBox.css'
import { SignWithDetails } from '@shared/types'
import MediaPlayer from '@renderer/components/MediaPlayer/MediaPlayer'
import { Dispatch, SetStateAction } from 'react'
import { sourcesCountText } from '@renderer/functions/namesVersionsHelpers'
import SignTitle from '../SignTitle/SignTitle'
import DefinitionList from '../../DefinitionList/DefinitionList'

interface SignBoxProps {
  sign: SignWithDetails
  setSignValues: (sign: SignWithDetails) => void
  setSourcesPanelSign: Dispatch<SetStateAction<SignWithDetails | null>>
  handleSignDelete: () => void
}

function SignBox(props: SignBoxProps): React.JSX.Element {
  const { sign, setSignValues, setSourcesPanelSign, handleSignDelete } = props

  return (
    <div className="signBoxContainer">
      <SignTitle sign={sign} setSignValues={setSignValues} handleSignDelete={handleSignDelete}/>
      <div className="signBox">
        <MediaPlayer file={sign.file} />
        <div className="variantDetails">
          {sign.notes && <div>{sign.notes}</div>}
          <DefinitionList sign={sign} />
          <a onClick={() => setSourcesPanelSign(sign)} className="additionalInfo">
            {sourcesCountText(sign.sourcesCount)}
          </a>
        </div>
      </div>
    </div>
  )
}

export default SignBox
