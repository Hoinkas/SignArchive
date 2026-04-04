import TagList from '@renderer/components/TagList/TagList'
import { SourceDetails } from '@shared/types'
import './SourceBox.css'
import { useState } from 'react'
import { mergeYearText } from '@renderer/functions/namesHelpers'
import SourceForm from '@renderer/components/Form/Forms/SourceForm'
import KebabMenu from '@renderer/components/KebabMenu/KebabMenu'
import { useSources } from '@contexts/SourcesContext/useSources'

interface SourceBoxProps {
  source: SourceDetails
}

function SourceBox({ source }: SourceBoxProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const { deleteSource } = useSources()

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
        <SourceForm source={source} formType={'edit'} setIsFormOpen={setIsFormOpen} />
      ) : (
        <KebabMenu setIsFormOpen={setIsFormOpen} handleDelete={() => deleteSource(source.id)} />
      )}
    </div>
  )
}

export default SourceBox
