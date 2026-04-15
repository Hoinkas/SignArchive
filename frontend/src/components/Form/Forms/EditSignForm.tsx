import {  type SubmitEvent, type Dispatch, type SetStateAction, useState } from 'react'
import { FormModalWrapper, FormMultiLineInput, FormSingleLineInput } from '@src/components/Form/Form'
import { useSigns } from '@src/hooks/SignsContext/useSigns'
import type { FormType } from '@src/models/yearStartEnd.model'
import type { ISignDetails, ISignDetailsEdit } from '@src/models/sign.model'
import type { IMediaAttached } from '@src/models/media.model'

interface EditSignFormProps {
  sign: ISignDetails
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function EditSignForm({ sign, formType, setIsFormOpen }: EditSignFormProps): React.JSX.Element {
  const { editSign } = useSigns()

  const [url, setUrl] = useState<string>(sign.media.url)
  const [mediaName, setMediaName] = useState<string>(sign.media.name ?? '')
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

    const media: IMediaAttached = { ...sign.media ,url, name: mediaName !== '' ? mediaName : undefined, mediaType: "video/mp4" }
    const updatedSign: ISignDetailsEdit = {
      notes: notes !== '' ? notes : undefined,
      media
    }

    editSign(sign.id, updatedSign, closeForm)
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormSingleLineInput label="URL do filmu" value={url} setValue={setUrl} required submitted={submitted} />
      <FormSingleLineInput label="Opis filmu" value={mediaName} setValue={setMediaName} />
      <FormMultiLineInput label="Notatka" value={notes} setValue={setNotes} />
    </FormModalWrapper>
  )
}

export default EditSignForm
