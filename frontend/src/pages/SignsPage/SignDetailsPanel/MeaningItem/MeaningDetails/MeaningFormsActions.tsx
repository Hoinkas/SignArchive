import type { IMeaningDetails } from '@src/models/meaning.model'
import { useState } from 'react'
import SourceForm from '@src/components/Form/Forms/SourceForm'
import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import type { FormType } from '@src/models/yearStartEnd.model'
import { useSign } from '@src/hooks/SignContext/useSign'
import MeaningForm from '@src/components/Form/Forms/MeaningForm'

interface MeaningFormsActionsProps {
  meaning: IMeaningDetails
  isHovering: boolean
}

function MeaningFormsActions({meaning, isHovering}: MeaningFormsActionsProps): React.JSX.Element {
  const {deleteMeaning} = useSign()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [formType, setFormType] = useState<FormType | null>(null)

  function handleAction(newType: FormType): void {
    setFormType(newType)
    setIsFormOpen(true)
  }

  function handleClose(): void {
    setFormType(null)
    setIsFormOpen(false)
  }

  return (
    <>
      {isFormOpen && formType === 'add' && <SourceForm meaningId={meaning.id} formType={'add'} closeAction={() => handleClose()}/>}
      {isFormOpen && formType === 'edit' && <MeaningForm meaning={meaning} formType={'edit'} closeAction={() => handleClose()}/>}
      <KebabMenu
        addLabel='źródło'
        editLabel='znaczenie'
        deleteLabel='znaczenie'
        handleAdd={() => handleAction('add')}
        handleEdit={() => handleAction('edit')}
        handleDelete={() => deleteMeaning(meaning.id)}
        isHovering={isHovering}
      />
    </>
  )
}

export default MeaningFormsActions
