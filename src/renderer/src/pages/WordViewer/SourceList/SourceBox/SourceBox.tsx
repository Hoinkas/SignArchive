import TagList from '@renderer/components/TagList/TagList'
import { SourceWithAuthorMediaFile } from '@shared/types'
import './SourceBox.css'
import { useState } from 'react'
import { mergeYearText } from '@renderer/functions/namesVersionsHelpers'
import SourceForm from '@renderer/components/Form/Forms/SourceForm'
import ActionButton from '@renderer/components/ActionButton/ActionButton'

interface SourceBoxProps {
  wordId: string
  signId: string
  setSourceValues: (source: SourceWithAuthorMediaFile) => void
  source: SourceWithAuthorMediaFile
}

function SourceBox(props: SourceBoxProps): React.JSX.Element {
  const { source, wordId, signId, setSourceValues } = props
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  const years = mergeYearText(source.yearStart, source.yearEnd)

  const pillText: string[] = [years]
  if (source.region) pillText.push(source.region)

  return (
    <div className="sourceBoxContainer">
      <div className="sourceBox">
        <a href={source.mediaFile.fileUrl}>{source.author.name}</a>
        <TagList textArray={pillText} />
        <div className="additionalInfoItalic">{source.notes}</div>
      </div>
      {isFormOpen ? (
        <SourceForm
          wordId={wordId}
          signId={signId}
          source={source}
          setSourceValues={setSourceValues}
          formType={'edit'}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <ActionButton text="edytuj" setIsFormOpen={setIsFormOpen} />
      )}
    </div>
  )
}

export default SourceBox
