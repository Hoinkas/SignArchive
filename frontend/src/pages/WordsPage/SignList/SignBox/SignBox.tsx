import './SignBox.css'
import MediaPlayer from '@src/components/MediaPlayer/MediaPlayer'
import { sourcesCountText } from '@src/utils/namesHelpers'
import SignTitle from '../SignTitle/SignTitle'
import DefinitionDetails from '../../DefinitionsDetails/DefinitionDetails'
import { useSources } from '@src/hooks/SourcesContext/useSources'
import DefinitionsProvider from '@src/hooks/DefinitonsContext/DefinitionsProvider'
import type { ISignDetails } from '@src/models/sign.model'
import { useState } from 'react'

interface SignBoxProps {
  sign: ISignDetails
}

function SignBox({ sign }: SignBoxProps): React.JSX.Element {
  const { changeSourcesPanelSign } = useSources()
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <div className="signBoxContainer"  onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
      <SignTitle sign={sign} isHovering={isHovering}/>
      <div className="signBox">
        <MediaPlayer media={sign.media} />
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
