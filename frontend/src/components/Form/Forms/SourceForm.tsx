import {  type SubmitEvent, type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import type { Author, AuthorToDB, FormType, MediaFileToDB, ISourceDetails, SourceToCreate, ISourceWithDetailsToDB } from '@shared/types'
import { FormModalWrapper, FormMultiLineInput, FormSingleLineInput, FormTwoInLineWrapper } from '../Form'
import { useSources } from '@src/hooks/SourcesContext/useSources'
import type { DropdownOption } from '../Components/FormDropdown'
import { FormCustomInputDropdown } from '../Components/FormCustomInputDropdown'
import { sourceApi } from '@src/services/source.api'
import { authorApi } from '@src/services/author.api'

interface SourceFormProps {
  source?: ISourceDetails
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function SourceForm({ source, formType, setIsFormOpen }: SourceFormProps): React.JSX.Element {
  const { addSource, editSource } = useSources()
  const [submitted, setSubmitted] = useState(false)

  const [notes, setNotes] = useState(source?.notes ?? '')
  const [region, setRegion] = useState(source?.region ?? '')
  const [yearStart, setYearStart] = useState(source?.yearStart?.toString() ?? '')
  const [yearEnd, setYearEnd] = useState(source?.yearEnd?.toString() ?? '')
  const [fileUrl, setFileUrl] = useState('')
  const [authorOption, setAuthorOption] = useState<DropdownOption | null>(
    source ? { id: source.author.id, label: source.author.name } : null
  )
  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    authorApi.list().then(setAuthors)
    if (source) {
      sourceApi.details(source.id).then((s) => {
        setFileUrl(s.mediaFile.fileUrl)
        setAuthorOption({ id: s.author.id, label: s.author.name })
      })
    }
  }, [source])

  const closeForm = (): void => {
    setNotes('')
    setFileUrl('')
    setRegion('')
    setYearStart('')
    setYearEnd('')
    setAuthorOption(null)
    setIsFormOpen(false)
  }

  const isValid = authorOption && fileUrl

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    const mediaFile: MediaFileToDB = { fileUrl }
    const author: AuthorToDB = { name: authorOption.label }
    const sourceToCreate: SourceToCreate = {
      notes: notes,
      region: region,
      yearStart: yearStart ? parseInt(yearStart) : null,
      yearEnd: yearEnd ? parseInt(yearEnd) : null
    }
    const data: ISourceWithDetailsToDB = { source: sourceToCreate, mediaFile, author }

    if (formType === 'add') {
      addSource(data, closeForm)
    } else if (formType === 'edit' && source) {
      editSource(source.id, data, closeForm)
    }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormSingleLineInput label="Online URL" value={fileUrl} setValue={setFileUrl} required submitted={submitted} />
      <FormMultiLineInput label="Notatka do źródła" value={notes} setValue={setNotes} />
      <FormTwoInLineWrapper>
        <FormCustomInputDropdown
          label="Autor / publikacja"
          options={authors.map((a) => ({ id: a.id, label: a.name }))}
          value={authorOption}
          setValue={setAuthorOption}
          required
          submitted={submitted}
        />
        <FormSingleLineInput label="Region" value={region} setValue={setRegion} />
      </FormTwoInLineWrapper>
      <FormTwoInLineWrapper>
        <FormSingleLineInput label="Rok początkowy" value={yearStart} setValue={setYearStart} isNumber />
        <FormSingleLineInput label="Rok końcowy" value={yearEnd} setValue={setYearEnd} isNumber />
      </FormTwoInLineWrapper>
    </FormModalWrapper>
  )
}

export default SourceForm
