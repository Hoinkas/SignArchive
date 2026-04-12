import './SourcesTitle.css'
import { mergeYearText, sourcesCountText } from '@src/utils/namesHelpers'
import { useSources } from '@src/hooks/SourcesContext/useSources'
import type { ISignDetails } from '@src/models/sign.model'

interface SourcesTitleProps {
  sign: ISignDetails
}

function SourcesTitle({ sign }: SourcesTitleProps): React.JSX.Element {
  const { sources, closeSourcesPanelSign } = useSources()

  const years = sources.flatMap((s) => [s.yearStart, s.yearEnd]).filter((y): y is number => y !== null)
  const yearText = years.length > 0 ? mergeYearText(Math.min(...years), Math.max(...years)) : 'brak roku'

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
