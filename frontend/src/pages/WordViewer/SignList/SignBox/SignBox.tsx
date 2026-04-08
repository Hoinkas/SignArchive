import './SignBox.css'
import type { SignDetails } from '@shared/types'
import MediaPlayer from '@src/components/MediaPlayer/MediaPlayer'
import { sourcesCountText } from '@src/utils/namesHelpers'
import SignTitle from '../SignTitle/SignTitle'
import DefinitionDetails from '../../DefinitionsDetails/DefinitionDetails'
import { useSources } from '@src/hooks/SourcesContext/useSources'
import DefinitionsProvider from '@src/hooks/DefinitonsContext/DefinitionsProvider'

interface SignBoxProps {
  sign: SignDetails
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
