import type { SourceDetails } from '@shared/types'
import './SourceBox.css'
import { useState } from 'react'
import { mergeYearText } from '@src/utils/namesHelpers'
import SourceForm from '@src/components/Form/Forms/SourceForm'
import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import { useSources } from '@src/hooks/SourcesContext/useSources'
import PillList from '@src/components/PillList/PillList'
import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'

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
