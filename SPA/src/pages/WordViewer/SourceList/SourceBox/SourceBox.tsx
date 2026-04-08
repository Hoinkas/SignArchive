import type { SourceDetails } from '@shared/types'
import './SourceBox.css'
import { useState } from 'react'
import { mergeYearText } from '@renderer/functions/namesHelpers'
import SourceForm from '@renderer/components/Form/Forms/SourceForm'
import KebabMenu from '@renderer/components/KebabMenu/KebabMenu'
import { useSources } from '@contexts/SourcesContext/useSources'
import PillList from '@renderer/components/PillList/PillList'
import { usePermissions } from '@contexts/PermissionsContext/usePermissions'

interface SourceBoxProps {
  source: SourceDetails
}

function SourceBox({ source }: SourceBoxProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const { deleteSource } = useSources()
  const { isAdmin } = usePermissions()

  const years = mergeYearText(source.yearStart, source.yearEnd)

  const pillText: string[] = [years]
  if (source.region) pillText.push(source.region)

  return (
    <div className="sourceBoxContainer">
      <div className="sourceBox">
        <a href={source.mediaFile.fileUrl}>{source.author.name}</a>
        <PillList textArray={pillText} />
        <div className="additionalInfoItalic">{source.notes}</div>
      </div>
      {isAdmin ? (isFormOpen ? (
        <SourceForm source={source} formType={'edit'} setIsFormOpen={setIsFormOpen} />
      ) : (
        <KebabMenu setIsFormOpen={setIsFormOpen} handleDelete={() => deleteSource(source.id)} />
      )) : <div></div>}
    </div>
  )
}

export default SourceBox
