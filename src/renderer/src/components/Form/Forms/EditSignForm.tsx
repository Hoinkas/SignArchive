import { Dispatch, SetStateAction, SubmitEvent, useState } from 'react'
import { FormType, SignWithSourceDetails } from '@shared/types'
import { FormMultiLineInput, FormWrapper } from '@renderer/components/Form/Form'

interface EditSignFormProps {
  sign: SignWithSourceDetails
  setSignValues: (sign: SignWithSourceDetails) => void
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function EditSignForm(props: EditSignFormProps): React.JSX.Element {
  const { sign, setSignValues, formType, setIsFormOpen } = props

  const [notes, setNotes] = useState<string>(sign.notes || '')

  const closeForm = (): void => {
    setNotes('')
    setIsFormOpen(false)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    window.api.sign.update(sign.id, { notes }).then((updatedSign) => {
      setSignValues({ ...sign, ...updatedSign })
      closeForm()
    })
  }

  return (
    <FormWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMultiLineInput label={'Notatka'} value={notes} setValue={setNotes} />
    </FormWrapper>
  )
}

export default EditSignForm
