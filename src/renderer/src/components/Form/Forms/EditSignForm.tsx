import { Dispatch, SetStateAction, useState } from 'react'
import { FormType, SignFile, SignToDB, SignWithDetails } from '@shared/types'
import { FormMediaFile, FormModalWrapper, FormMultiLineInput } from '@renderer/components/Form/Form'

interface EditSignFormProps {
  sign: SignWithDetails
  setSignValues: (sign: SignWithDetails) => void
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function EditSignForm(props: EditSignFormProps): React.JSX.Element {
  const { sign, setSignValues, formType, setIsFormOpen } = props

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

    const updatedSign: Partial<SignToDB> = {
      notes,
      ...(signFile && { file: JSON.stringify(signFile) })
    }

    window.api.sign.update(sign.id, updatedSign).then((result) => {
      setSignValues({ ...sign, ...result })
      closeForm()
    })
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMediaFile existingFile={sign.file} newFile={newFile} setNewFile={setNewFile} />
      <FormMultiLineInput label="Notatka" value={notes} setValue={setNotes} />
    </FormModalWrapper>
  )
}

export default EditSignForm
