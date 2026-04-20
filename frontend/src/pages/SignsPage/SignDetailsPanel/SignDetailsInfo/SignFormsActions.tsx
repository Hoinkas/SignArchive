import { useState } from 'react'
import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import type { FormType } from '@src/models/yearStartEnd.model'
import { useSign } from '@src/hooks/SignContext/useSign'
import MeaningForm from '@src/components/Form/Forms/MeaningForm'
import type { ISignDetails } from '@src/models/sign.model'
import SignForm from '@src/components/Form/Forms/SignForm'

interface SignFormsActionsProps {
  sign: ISignDetails
  isHovering: boolean
}

function SignFormsActions({sign, isHovering}: SignFormsActionsProps): React.JSX.Element {
  const {deleteSignAndMedia} = useSign()
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
      {isFormOpen && formType === 'add' && <MeaningForm formType={'add'} closeAction={() => handleClose()}/>}
      {isFormOpen && formType === 'edit' && <SignForm formType={'edit'} closeAction={() => handleClose()}/>}
      <KebabMenu
        addLabel='znaczenie'
        editLabel='znak'
        deleteLabel='znak'
        handleAdd={() => handleAction('add')}
        handleEdit={() => handleAction('edit')}
        handleDelete={() => deleteSignAndMedia(sign.id)}
        isHovering={isHovering}
      />
    </>
  )
}

export default SignFormsActions
