import { SignWithDetails } from '@shared/types'
import './SourcesTitle.css'
import { mergeYearText, sourcesCountText } from '@renderer/functions/namesVersionsHelpers'
import { Dispatch, SetStateAction } from 'react'

interface SourcesTitleProps {
  sign: SignWithDetails
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function SourcesTitle({ sign, setIsFormOpen }: SourcesTitleProps): React.JSX.Element {
  return (
    <div className="sourcesTitleContainer">
      <div className="sourcesTitle">
        <div className="additionalInfoItalic"> Znak {sign.id}</div>
        <div className="additionalInfo">
          {sourcesCountText(sign.sourcesCount)} · {mergeYearText(sign.yearStart, sign.yearEnd)}
        </div>
        <div>{sign.notes}</div>
      </div>
      <div className="clickableSymbolCircle" onClick={() => setIsFormOpen(true)}>×</div>
    </div>
  )
}

export default SourcesTitle
