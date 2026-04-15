import './SourceBox.css'
import { useState } from 'react'
import { mergeYearText } from '@src/utils/namesHelpers'
import SourceForm from '@src/components/Form/Forms/SourceForm'
import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import { useSources } from '@src/hooks/SourcesContext/useSources'
import PillList from '@src/components/PillList/PillList'
import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import type { ISourceDetails } from '@src/models/source.model'

interface SourceBoxProps {
  source: ISourceDetails
}

function SourceBox({ source }: SourceBoxProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const { deleteSource } = useSources()
  const { isAdmin } = usePermissions()

  const years = mergeYearText(source.yearStart, source.yearEnd)

  const pillText: string[] = [years]
  if (source.region) pillText.push(source.region)
  if (source.translations) source.translations.split(', ').forEach((t) => pillText.push(t))

  return (
    <div className="sourceBoxContainer" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
      <div className="sourceBox">
        <a href={source.evidence.url} target="_blank">{source.evidence.name}</a>
        <PillList textArray={pillText} />
        <div className="additionalInfoItalic">{source.notes}</div>
      </div>
      {isAdmin ? (isFormOpen ? (
        <SourceForm source={source} formType={'edit'} setIsFormOpen={setIsFormOpen} />
      ) : (
        <KebabMenu setIsFormOpen={setIsFormOpen} handleDelete={() => deleteSource(source.id)} isHovering={isHovering}/>
      )) : <div></div>}
    </div>
  )
}

export default SourceBox
