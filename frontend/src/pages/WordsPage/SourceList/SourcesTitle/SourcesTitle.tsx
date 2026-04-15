import './SourcesTitle.css'
import { mergeYearText, sourcesCountText } from '@src/utils/namesHelpers'
import { useSources } from '@src/hooks/SourcesContext/useSources'
import type { ISignDetails } from '@src/models/sign.model'

interface SourcesTitleProps {
  sign: ISignDetails
}

function SourcesTitle({ sign }: SourcesTitleProps): React.JSX.Element {
  const { sources, closeSourcesPanelSign } = useSources()

  console.log(sign)
  const yearText = mergeYearText(sign.yearStart, sign.yearEnd)

  return (
    <div className="sourcesTitleContainer">
      <div className="sourcesTitle">
        <div className="additionalInfoItalic"> Znak {sign.id}</div>
        <div className="additionalInfo">
          {sourcesCountText(sources.length)} · {yearText}
        </div>
        <div>{sign.notes}</div>
      </div>
      <div className="clickableSymbolCircle" onClick={() => closeSourcesPanelSign()}>×</div>
    </div>
  )
}

export default SourcesTitle
