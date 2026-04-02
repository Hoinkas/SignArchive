import { Dispatch, SetStateAction, SubmitEvent, useEffect, useState } from 'react'
import {
  Author,
  AuthorToDB,
  FormType,
  MediaFileToDB,
  SourceToCreate,
  SourceWithAuthorMediaFile,
  SourceWithDetailsToDB
} from '@shared/types'
import {
  FormModalWrapper,
  FormMultiLineInput,
  FormSingleLineInput,
  FormTwoInLineWrapper
} from '../Form'
import { DropdownOption, FormDropdown } from '../Components/FormDropdown'
import { useSources } from '@contexts/SourcesContext/useSources'

interface SourceFormProps {
  source?: SourceWithAuthorMediaFile
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function SourceForm(props: SourceFormProps): React.JSX.Element {
  const { source, formType, setIsFormOpen } = props
  const { addSource, editSource } = useSources()

  const [notes, setNotes] = useState<string>(source?.notes || '')
  const [region, setRegion] = useState<string>(source?.region || '')
  const [yearStart, setYearStart] = useState<string>(source?.yearStart?.toString() || '')
  const [yearEnd, setYearEnd] = useState<string>(source?.yearEnd?.toString() || '')

  const [fileUrl, setFilePath] = useState<string>('')

  const [authorOption, setAuthorOption] = useState<DropdownOption | null>(
    source ? { id: source?.author.id, label: source?.author.name } : null
  )
  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    window.api.author.list().then((authors) => setAuthors(authors))

    if (source) {
      window.api.source.details(source.id).then((sourceRecieved) => {
        setFilePath(sourceRecieved.mediaFile.fileUrl)
        setAuthorOption({ id: sourceRecieved.author.id, label: sourceRecieved.author.name })
      })
    }
  }, [source])

  const closeForm = (): void => {
    setNotes('')
    setFilePath('')
    setRegion('')
    setYearStart('')
    setYearEnd('')
    setAuthorOption(null)
    setIsFormOpen(false)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (!authorOption) return

    const mediaFile: MediaFileToDB = { fileUrl }
    const author: AuthorToDB = { name: authorOption.label }

    const yearStartStr = yearStart ? parseInt(yearStart) : undefined
    const yearEndStr = yearEnd ? parseInt(yearEnd) : undefined
    const sourceToCreate: SourceToCreate = {
      notes: notes,
      yearStart: yearStartStr,
      yearEnd: yearEndStr,
      region
    }

    if (formType === 'add') {
      const data: SourceWithDetailsToDB = {
        ...sourceToCreate,
        mediaFile,
        author
      }

      addSource(data, closeForm)
    } else if (formType === 'edit' && source) {
      const data: Partial<SourceWithDetailsToDB> = {
        notes,
        region,
        yearStart: yearStartStr,
        yearEnd: yearEndStr,
        mediaFile: { fileUrl },
        author
      }
      editSource(source.id, data, closeForm)
    }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormSingleLineInput label={'Online Url'} value={fileUrl} setValue={setFilePath} />
      <FormMultiLineInput label={'Notatka do źródła'} value={notes} setValue={setNotes} />
      <FormTwoInLineWrapper>
        <FormDropdown
          label="Autor / publikacja"
          options={authors.map((a) => ({ id: a.id, label: a.name }))}
          value={authorOption}
          setValue={setAuthorOption}
        />
        <FormSingleLineInput label={'Region'} value={region} setValue={setRegion} />
      </FormTwoInLineWrapper>
      <FormTwoInLineWrapper>
        <FormSingleLineInput
          label={'Rok początkowy'}
          value={yearStart}
          setValue={setYearStart}
          isNumber={true}
        />
        <FormSingleLineInput
          label={'Rok końcowy'}
          value={yearEnd}
          setValue={setYearEnd}
          isNumber={true}
        />
      </FormTwoInLineWrapper>
    </FormModalWrapper>
)
}

export default SourceForm
