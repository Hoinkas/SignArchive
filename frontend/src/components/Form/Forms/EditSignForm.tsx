import {  type SubmitEvent, type Dispatch, type SetStateAction, useState } from 'react'
import { FormMedia, FormModalWrapper, FormMultiLineInput, FormSingleLineInput } from '@src/components/Form/Form'
import { useSigns } from '@src/hooks/SignsContext/useSigns'
import type { FormType } from '@src/models/yearStartEnd.model'
import type { ISignDetails, ISignDetailsEdit } from '@src/models/sign.model'
import type { IMediaAttached } from '@src/models/media.model'
import { mediaApi } from '@src/services/media.api'

interface EditSignFormProps {
  sign: ISignDetails
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function EditSignForm({ sign, formType, setIsFormOpen }: EditSignFormProps): React.JSX.Element {
  const { editSign } = useSigns()

  const [newFile, setNewFile] = useState<File | null>(null)
  const [mediaName, setMediaName] = useState<string>(sign.media.name ?? '')
  const [notes, setNotes] = useState<string>(sign.notes ?? '')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const closeForm = (): void => {
    setNewFile(null)
    setNotes('')
    setIsFormOpen(false)
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setSubmitted(true)

    let media: IMediaAttached = {
      ...sign.media,
      name: mediaName !== '' ? mediaName : undefined
    }

    if (newFile) {
      media = await mediaApi.upload(newFile, mediaName !== '' ? mediaName : undefined)
    }

    const updatedSign: ISignDetailsEdit = {
      notes: notes !== '' ? notes : undefined,
      media
    }

    editSign(sign.id, updatedSign, closeForm)
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMedia
        newFile={newFile}
        setNewFile={setNewFile}
        existingFile={sign.media.url.split('/').pop() ?? sign.media.url}
        submitted={submitted}
      />
      <FormSingleLineInput label="Opis filmu" value={mediaName} setValue={setMediaName} />
      <FormMultiLineInput label="Notatka" value={notes} setValue={setNotes} />
    </FormModalWrapper>
  )
}

export default EditSignForm
