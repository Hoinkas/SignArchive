import {  type SubmitEvent, type Dispatch, type SetStateAction, useState } from 'react'
import type { FormType, SignDetails, SignToDB } from '@shared/types'
import { FormModalWrapper, FormMultiLineInput, FormSingleLineInput } from '@renderer/components/Form/Form'
import { useSigns } from '@contexts/SignsContext/useSigns'

interface EditSignFormProps {
  sign: SignDetails
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function EditSignForm({ sign, formType, setIsFormOpen }: EditSignFormProps): React.JSX.Element {
  const { editSign } = useSigns()

  const [url, setUrl] = useState<string>(sign.file.url)
  const [notes, setNotes] = useState<string>(sign.notes ?? '')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const closeForm = (): void => {
    setNotes('')
    setUrl('')
    setIsFormOpen(false)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmitted(true)
    if (!url) return

    const updatedSign: SignToDB = {
      notes,
      fileUrl: url,
    }

    editSign(sign.id, updatedSign, closeForm)
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormSingleLineInput label="URL do filmu" value={url} setValue={setUrl} required submitted={submitted} />
      <FormMultiLineInput label="Notatka" value={notes} setValue={setNotes} />
    </FormModalWrapper>
  )
}

export default EditSignForm
