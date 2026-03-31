import TagList from '@renderer/components/TagList/TagList'
import { SourceWithAuthorMediaFile } from '@shared/types'
import './SourceBox.css'
import { useState } from 'react'
import { mergeYearText } from '@renderer/functions/namesVersionsHelpers'

interface SourceBoxProps {
  source: SourceWithAuthorMediaFile
}

function SourceBox({ source }: SourceBoxProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  const years = mergeYearText(source.yearStart, source.yearEnd)

  const pillText: string[] = [years]
  if (source.region) pillText.push(source.region)

  return (
    <div className="sourceBox">
      <a href={source.mediaFile.fileUrl}>{source.author.name}</a>
      <TagList textArray={pillText} />
      <div className="additionalInfoItalic">{source.notes}</div>
    </div>
  )
}

export default SourceBox
