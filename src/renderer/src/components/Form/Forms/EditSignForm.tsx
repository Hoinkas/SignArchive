import { Dispatch, SetStateAction, useState } from 'react'
import { FormType, SignFile, SignToDB, SignWithDetails } from '@shared/types'
import { FormMediaFile, FormModalWrapper, FormMultiLineInput } from '@renderer/components/Form/Form'
import { useSigns } from '@contexts/SignsContext/useSigns'

interface EditSignFormProps {
  sign: SignWithDetails
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function EditSignForm(props: EditSignFormProps): React.JSX.Element {
  const { sign, formType, setIsFormOpen } = props
  const { editSign } = useSigns()

  const [newFile, setNewFile] = useState<File | null>(null)
  const [notes, setNotes] = useState<string>(sign.notes || '')

  const closeForm = (): void => {
    setNotes('')
    setNewFile(null)
    setIsFormOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    let signFile: SignFile | undefined

    if (newFile) {
      signFile = {
        path: window.api.getPathForFile(newFile),
        originalName: newFile.name,
        mimeType: newFile.type,
        size: newFile.size
      }
    }

    const updatedSign: SignToDB = {
      notes,
      file: signFile ? JSON.stringify(signFile) : JSON.stringify(sign.file)
    }

    editSign(sign.id, updatedSign, closeForm)
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMediaFile existingFile={sign.file} newFile={newFile} setNewFile={setNewFile} />
      <FormMultiLineInput label="Notatka" value={notes} setValue={setNotes} />
    </FormModalWrapper>
  )
}

export default EditSignForm
