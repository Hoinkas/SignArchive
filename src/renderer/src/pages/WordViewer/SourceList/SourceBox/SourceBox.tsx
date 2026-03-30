import TagList from '@renderer/components/TagList/TagList'
import { SourceWithSignerAuthorMediaFile } from '@shared/types'
import './SourceBox.css'
import { useState } from 'react'
import { mergeYearText } from '@renderer/functions/namesVersionsHelpers'

interface SourceBoxProps {
  source: SourceWithSignerAuthorMediaFile
  isMainSource?: boolean
}

function SourceBox({ source, isMainSource = false }: SourceBoxProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  const signer = source.signer
  const signerNames = signer.name + ' ' + signer.surname
  const years = mergeYearText(source.yearStart, source.yearEnd)

  const pillText: string[] = [years, signerNames]
  if (source.region) pillText.push(source.region)

  const returnAuthor = isMainSource ? (
    <div>{source.author.name}</div>
  ) : (
    <a href={source.mediaFile.filePath}>{source.author.name}</a>
  )

  return (
    <div className="sourceBox">
      {returnAuthor}
      <TagList textArray={pillText} />
      <div className="additionalInfoItalic">{source.notes}</div>
    </div>
  )
}

export default SourceBox
