import './SignBox.css'
import { SignWithDetails } from '@shared/types'
import MediaPlayer from '@renderer/components/MediaPlayer/MediaPlayer'
import { sourcesCountText } from '@renderer/functions/namesVersionsHelpers'
import SignTitle from '../SignTitle/SignTitle'
import DefinitionList from '../../DefinitionList/DefinitionList'
import { useSources } from '@contexts/SourcesContext/useSources'

interface SignBoxProps {
  sign: SignWithDetails
}

function SignBox({ sign }: SignBoxProps): React.JSX.Element {
  const { changeSourcesPanelSign } = useSources()

  return (
    <div className="signBoxContainer">
      <SignTitle sign={sign} />
      <div className="signBox">
        <MediaPlayer file={sign.file} />
        <div className="variantDetails">
          {sign.notes && <div>{sign.notes}</div>}
          <DefinitionList sign={sign} />
          <a onClick={() => changeSourcesPanelSign(sign)} className="additionalInfo">
            {sourcesCountText(sign.sourcesCount)}
          </a>
        </div>
      </div>
    </div>
  )
}

export default SignBox
