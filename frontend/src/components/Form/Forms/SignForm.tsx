import {  type SubmitEvent, type Dispatch, type SetStateAction, useState } from 'react'
import {
  FormMultiLineInput,
  FormModalWrapper,
  FormMedia
} from '@src/components/Form/Form'
import type { FormType } from '@src/models/yearStartEnd.model'
import type { ISignDetails, ISignDetailsToDB } from '@src/models/sign.model'
import type { IMediaToDB } from '@src/models/media.model'
import { useSign } from '@src/hooks/SignContext/useSign'

interface AddSignFormProps {
  sign?: ISignDetails
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function AddSignForm({ formType, setIsFormOpen }: AddSignFormProps): React.JSX.Element {
  const { sign, addSign, editSign } = useSign()

  const [submitted, setSubmitted] = useState<boolean>(false)

  const [notes, setNotes] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [description, setDescription] = useState<string>('')

  const closeForm = (): void => {
    setNotes('')
    setFile(null)
    setThumbnail(null)
    setDescription('')

    setIsFormOpen(false)
  }

  const isValid = file

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    const media: IMediaToDB = {
      videoFile: file,
      thumbnailFile: thumbnail ?? undefined,
      description: description != '' ? description : undefined
    }

    const data: ISignDetailsToDB = {
      media,
      notes: notes !== '' ? notes : undefined
    }

    if (formType === 'add') addSign(data, closeForm)
    else if (formType === 'edit' && sign) editSign(sign.id, data, closeForm)
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMedia label="Film ze znakiem" file={file} setNewFile={setFile} required submitted={submitted} />
      <FormMedia label="Miniatura filmu" file={thumbnail} setNewFile={setThumbnail} />
      <FormMultiLineInput label="Opis filmu dla niewidomych" value={description} setValue={setDescription} />
      <FormMultiLineInput label="Notatka do znaku" value={notes} setValue={setNotes} />
    </FormModalWrapper>
  )
}

export default AddSignForm
