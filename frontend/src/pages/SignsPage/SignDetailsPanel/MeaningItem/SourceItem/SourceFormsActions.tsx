import { useState } from 'react'
import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import { useSign } from '@src/hooks/SignContext/useSign'
import type { ISourceDetails } from '@src/models/source.model'
import SourceForm from '@src/components/Form/Forms/SourceForm'

interface SourceFormsActionsProps {
  meaningId: string
  source: ISourceDetails
  isHovering: boolean
}

function SourceFormsActions({meaningId, source, isHovering}: SourceFormsActionsProps): React.JSX.Element {
  const {deleteSource} = useSign()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  function handleClose(): void {
    setIsFormOpen(false)
  }

  return (
    <>
      {isFormOpen && <SourceForm source={source} meaningId={meaningId} formType={'edit'} closeAction={() => handleClose()}/>}
      <KebabMenu
        editLabel='znaczenie'
        deleteLabel='znaczenie'
        handleEdit={() => setIsFormOpen(true)}
        handleDelete={() => deleteSource(meaningId, source.id)}
        isHovering={isHovering}
      />
    </>
  )
}

export default SourceFormsActions
