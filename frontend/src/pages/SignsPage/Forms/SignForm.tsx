import {  type SubmitEvent, useState } from 'react'
import {
  FormMultiLineInput,
  FormModalWrapper,
  FormMedia
} from '@src/components/Form/Form'
import type { FormType } from '@src/models/yearStartEnd.model'
import type { ISignDetails, ISignDetailsToDB } from '@src/models/sign.model'
import { useSign } from '@src/hooks/SignContext/useSign'
import { getChanges } from '@src/utils/getChangesFromForm'
import type { IMediaToDB } from '@src/models/media.model'

interface SignFormProps {
  sign?: ISignDetails
  formType: FormType
  closeAction: () => void
}

function SignForm({ sign, formType, closeAction }: SignFormProps): React.JSX.Element {
  const { addSignAndMedia, editSignAndMedia } = useSign()

  const [submitted, setSubmitted] = useState<boolean>(false)

  const [notes, setNotes] = useState<string>(sign?.notes ?? '')
  const [file, setFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [description, setDescription] = useState<string>(sign?.media.description ?? '')

  const handleFormClose = (): void => {
    setNotes('')
    setFile(null)
    setThumbnail(null)
    setDescription('')

    closeAction()
  }

  const isValid = file || sign?.media

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return
    if (!file && !sign?.media) return

    const data: ISignDetailsToDB = {
      notes: notes !== '' ? notes : undefined
    }

    try {
      if (formType === 'add') {
        if (!file) return
        const media: IMediaToDB = { videoFile: file, thumbnailFile: thumbnail ?? undefined, description: description || undefined }
        addSignAndMedia(data, media, closeAction)
      } else if (formType === 'edit' && sign) {
        const signChanges = getChanges(sign, data)

        const mediaChanges: Partial<IMediaToDB> = {}
        if (file) mediaChanges.videoFile = file
        if (thumbnail) mediaChanges.thumbnailFile = thumbnail
        if (description !== (sign.media.description ?? '')) mediaChanges.description = description

        if (Object.keys(signChanges).length === 0 && Object.keys(mediaChanges).length === 0) {
          closeAction()
          return
        }

        editSignAndMedia(sign.id, signChanges, mediaChanges, closeAction)
      }
    } catch { console.log('Some SignForm error') }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={handleFormClose}>
      <FormMedia label="Film ze znakiem" file={file} setNewFile={setFile} existingFile={sign?.media.videoUrl.split('/').pop() ?? sign?.media.videoUrl} required submitted={submitted} />
      <FormMedia label="Miniatura filmu" file={thumbnail} setNewFile={setThumbnail} existingFile={sign?.media.thumbnailUrl?.split('/').pop() ?? sign?.media.thumbnailUrl ?? undefined}/>
      <FormMultiLineInput label="Opis filmu dla niewidomych" value={description} setValue={setDescription} />
      <FormMultiLineInput label="Notatka do znaku" value={notes} setValue={setNotes} />
    </FormModalWrapper>
  )
}

export default SignForm
