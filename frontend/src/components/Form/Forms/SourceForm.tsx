import {  type SubmitEvent, type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { FormModalWrapper, FormMultiLineInput, FormSingleLineInput, FormTwoInLineWrapper } from '../Form'
import { useSources } from '@src/hooks/SourcesContext/useSources'
import type { DropdownOption } from '../Components/FormDropdown'
import { FormCustomInputDropdown } from '../Components/FormCustomInputDropdown'
import { authorApi } from '@src/services/author.api'
import type { ISourceDetails, ISourceToCreate, ISourceWithDetailsToDB } from '@src/models/source.model'
import type { IAuthor, IAuthorAttached } from '@src/models/author.model'
import type { FormType } from '@src/models/yearStartEnd.model'
import type { IEvidence } from '@src/models/evidence.model'

interface SourceFormProps {
  source?: ISourceDetails
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function SourceForm({ source, formType, setIsFormOpen }: SourceFormProps): React.JSX.Element {
  const { addSource, editSource } = useSources()
  const [submitted, setSubmitted] = useState(false)

  const [authors, setAuthors] = useState<IAuthorAttached[]>([])
  const [notes, setNotes] = useState(source?.notes ?? '')
  const [region, setRegion] = useState(source?.region ?? '')
  const [yearStart, setYearStart] = useState(source?.yearStart?.toString() ?? '')
  const [yearEnd, setYearEnd] = useState(source?.yearEnd?.toString() ?? '')
  const [evidenceUrl, setEvidenceUrl] = useState<string>(source?.evidence.url ?? '')
  const [evidenceName, setEvidenceName] = useState<string>(source?.evidence.name ?? '')
  const [evidenceFullName, setEvidenceFullName] = useState<string>(source?.evidence.fullName ?? '')
  const [translations, setTranslations] = useState<string>(source?.translations ?? '')
  const [authorOption, setAuthorOption] = useState<DropdownOption | null>(
    source ? { id: source.author.id, label: source.author.name } : null
  )

  useEffect(() => {
    authorApi.list().then(setAuthors)
  }, [])

  const closeForm = (): void => {
    setNotes('')
    setEvidenceUrl('')
    setRegion('')
    setYearStart('')
    setYearEnd('')
    setTranslations('')
    setAuthorOption(null)
    setIsFormOpen(false)
  }

  const isValid = authorOption && evidenceName && evidenceFullName && translations

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    const evidence: IEvidence = { url: evidenceUrl, name: evidenceName, fullName: evidenceFullName }
    const author: IAuthor = { name: authorOption.label }
    const sourceToCreate: ISourceToCreate = {
      notes: notes !== '' ? notes : undefined,
      region: region !== '' ? region : undefined,
      yearStart: yearStart !== '' ? parseInt(yearStart) : undefined,
      yearEnd: yearEnd !== '' ? parseInt(yearEnd) : undefined,
      translations: translations !== '' ? translations : undefined
    }
    const data: ISourceWithDetailsToDB = { source: sourceToCreate, evidence, author }

    if (formType === 'add') {
      addSource(data, closeForm)
    } else if (formType === 'edit' && source) {
      editSource(source.id, data, closeForm)
    }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormSingleLineInput label="Online URL" value={evidenceUrl} setValue={setEvidenceUrl} />
      <FormTwoInLineWrapper>
        <FormSingleLineInput label="Krótka nazwa źródła" value={evidenceName} setValue={setEvidenceName} required submitted={submitted} />
        <FormSingleLineInput label="Tłumaczenie znaku" value={translations} setValue={setTranslations} required submitted={submitted} />
      </FormTwoInLineWrapper>
      <FormMultiLineInput label="Długa nazwa źródła" value={evidenceFullName} setValue={setEvidenceFullName} required submitted={submitted} />
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
