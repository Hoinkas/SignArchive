import { SignDetails } from '@shared/types'
import './SourcesTitle.css'
import { mergeYearText, sourcesCountText } from '@renderer/functions/namesHelpers'
import { useSources } from '@contexts/SourcesContext/useSources'

interface SourcesTitleProps {
  sign: SignDetails
}

function SourcesTitle({ sign }: SourcesTitleProps): React.JSX.Element {
  const { closeSourcesPanelSign } = useSources()

  return (
    <div className="sourcesTitleContainer">
      <div className="sourcesTitle">
        <div className="additionalInfoItalic"> Znak {sign.id}</div>
        <div className="additionalInfo">
          {sourcesCountText(sign.sourcesCount)} · {mergeYearText(sign.yearStart, sign.yearEnd)}
        </div>
        <div>{sign.notes}</div>
      </div>
      <div className="clickableSymbolCircle" onClick={() => closeSourcesPanelSign()}>×</div>
    </div>
  )
}

export default SourcesTitle
