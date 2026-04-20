import type { IMeaningDetails } from '@src/models/meaning.model'
import { useState } from 'react'
import SourceForm from '@src/components/Form/Forms/SourceForm'
import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import type { FormType } from '@src/models/yearStartEnd.model'
import { useSign } from '@src/hooks/SignContext/useSign'
import MeaningForm from '@src/components/Form/Forms/MeaningForm'

interface MeaningDetailsProps {
  meaning: IMeaningDetails
}

function MeaningDetails({meaning}: MeaningDetailsProps): React.JSX.Element {
  const {deleteMeaning} = useSign()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [formType, setFormType] = useState<FormType | null>(null)
  const [isHovering, setIsHovering] = useState<boolean>(false)

  function handleAction(newType: FormType): void {
    setFormType(newType)
    setIsFormOpen(true)
  }

  return (
    <div style={{display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center'}}
    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      {meaning.explanation}
      {isFormOpen && formType === 'add' && <SourceForm meaningId={meaning.id} formType={'add'} setIsFormOpen={setIsFormOpen}/>}
      {isFormOpen && formType === 'edit' && <MeaningForm meaning={meaning} formType={'edit'} setIsFormOpen={setIsFormOpen}/>}
      <KebabMenu
        addLabel='źródło'
        editLabel='znaczenie'
        deleteLabel='znaczenie'
        handleAdd={() => handleAction('add')}
        handleEdit={() => handleAction('edit')}
        handleDelete={() => deleteMeaning(meaning.id)}
        isHovering={isHovering}
      />
    </div>
  )
}

export default MeaningDetails
