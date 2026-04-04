import './SignBox.css'
import { SignWithDetails } from '@shared/types'
import MediaPlayer from '@renderer/components/MediaPlayer/MediaPlayer'
import { sourcesCountText } from '@renderer/functions/namesHelpers'
import SignTitle from '../SignTitle/SignTitle'
import DefinitionDetails from '../../DefinitionsDetails/DefinitionDetails'
import { useSources } from '@contexts/SourcesContext/useSources'
import DefinitionsProvider from '@contexts/DefinitonsContext/DefinitionsProvider'

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
          <DefinitionsProvider>
            <DefinitionDetails sign={sign} notes={sign.notes} />
          </DefinitionsProvider>
          <div className="bottomInfo">
            <a onClick={() => changeSourcesPanelSign(sign)} className="additionalInfo">
              {sourcesCountText(sign.sourcesCount)}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignBox
