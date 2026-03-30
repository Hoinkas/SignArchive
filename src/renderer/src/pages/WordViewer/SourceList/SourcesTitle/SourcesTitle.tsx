import { SignWithSourceDetails } from '@shared/types'
import './SourcesTitle.css'
import { mergeYearText, sourcesCountText } from '@renderer/functions/namesVersionsHelpers'

interface SourcesTitleProps {
  sign: SignWithSourceDetails
  closeForm: () => void
}

function SourcesTitle({ sign, closeForm }: SourcesTitleProps): React.JSX.Element {
  return (
    <div className="sourcesTitleContainer">
      <div className="sourcesTitle">
        <div className="additionalInfoItalic"> Znak {sign.id}</div>
        <div className="additionalInfo">
          {sourcesCountText(sign.sourcesCount)} - {mergeYearText(sign.yearStart, sign.yearEnd)}
        </div>
        <div>{sign.notes}</div>
      </div>
      <div className="clickableSymbolCircle" onClick={closeForm}>×</div>
    </div>
  )
}

export default SourcesTitle
