import { type DropdownOption, evidencesTypes } from "@src/components/Form/Components/DropdownOptions"
import FormDropdown from "@src/components/Form/Components/FormDropdown"
import FormTags from "@src/components/Form/Components/FormTags"
import { FormModalWrapper, FormSingleLineInput, FormTwoInLineWrapper, FormMultiLineInput } from "@src/components/Form/Form"
import { useSign } from "@src/hooks/SignContext/useSign"
import type { IReference, ReferenceType } from "@src/models/reference.model"
import type { ISourceDetails, ISourceToDB, ISourceWithDetailsToDB } from "@src/models/source.model"
import type { FormType } from "@src/models/yearStartEnd.model"
import { regionApi } from "@src/services/region.api"
import { useState, useEffect } from "react"

interface SourceFormProps {
  source?: ISourceDetails
  meaningId: string
  formType: FormType
  closeAction: () => void
}

function SourceForm({ source, meaningId, formType, closeAction }: SourceFormProps): React.JSX.Element {
  const { addSource, editSource } = useSign()
  const [submitted, setSubmitted] = useState(false)

  const [yearStart, setYearStart] = useState(source?.yearStart?.toString() ?? '')
  const [yearEnd, setYearEnd] = useState(source?.yearEnd?.toString() ?? '')
  const [context, setContext] = useState(source?.context ?? '')

  const [regions, setRegions] = useState<DropdownOption[]>(
    source ? source.regions.map((r) => ({ id: r.id, label: r.name })) : []
  )
  const [regionsOptions, setRegionsOptions] = useState<DropdownOption[]>([])

  const [referenceUrl, setReferenceUrl] = useState<string>(source?.reference.url ?? '')
  const [referenceName, setReferenceName] = useState<string>(source?.reference.name ?? '')
  const [referenceFullName, setReferenceFullName] = useState<string>(source?.reference.fullName ?? '')
  const [typeOption, setTypeOption] = useState<DropdownOption | null>(
    source ? { id: source.reference.type, label: source.reference.type } : null
  )
  const [notes, setNotes] = useState(source?.reference.notes ?? '')

  useEffect(() => {
    regionApi.list().then((result) =>
      setRegionsOptions(result.map((r) => ({ id: r.id, label: r.name })))
    )
  }, [])

  const closeForm = (): void => {
    setNotes('')
    setReferenceUrl('')
    setContext('')
    setYearStart('')
    setYearEnd('')
    setRegions([])
    setReferenceName('')
    setReferenceFullName('')
    setTypeOption(null)
    closeAction()
  }

  const isValid = referenceName && referenceFullName && typeOption

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    const referenceToCreate: IReference = {
      url: referenceUrl !== '' ? referenceUrl : undefined,
      name: referenceName,
      fullName: referenceFullName,
      type: typeOption.label as ReferenceType,
      notes: notes !== '' ? notes : undefined
    }

    const sourceToCreate: ISourceToDB = {
      yearStart: yearStart !== '' ? parseInt(yearStart) : undefined,
      yearEnd: yearEnd !== '' ? parseInt(yearEnd) : undefined,
      context: context !== '' ? context : undefined
    }

    if (formType === 'add') {
      const data: ISourceWithDetailsToDB = {
        source: sourceToCreate,
        reference: referenceToCreate,
        regions: []
      }
      addSource(meaningId, data, regions, closeForm)
    } else if (formType === 'edit' && source) {
      const oldRegions = source.regions.map((r): DropdownOption => ({ id: r.id, label: r.name }))
      const sourceChanges: Partial<ISourceDetails> = {
        context: sourceToCreate.context,
        yearStart: sourceToCreate.yearStart,
        yearEnd: sourceToCreate.yearEnd,
        reference: { ...source.reference, ...referenceToCreate }
      }
      editSource(meaningId, source.id, sourceChanges, oldRegions, regions, closeForm)
    }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormSingleLineInput label="Online URL" value={referenceUrl} setValue={setReferenceUrl} />
      <FormTwoInLineWrapper>
        <FormTags label="Regiony użycia" dropdownOptions={regionsOptions} tagList={regions} setTagList={setRegions} />
        <FormSingleLineInput label="Krótka nazwa źródła" value={referenceName} setValue={setReferenceName} required submitted={submitted} />
      </FormTwoInLineWrapper>
      <FormMultiLineInput label="Długa nazwa źródła" value={referenceFullName} setValue={setReferenceFullName} required submitted={submitted} />
      <FormTwoInLineWrapper>
        <FormSingleLineInput label="Rok początkowy" value={yearStart} setValue={setYearStart} type='number' />
        <FormSingleLineInput label="Rok końcowy" value={yearEnd} setValue={setYearEnd} type='number' />
        <FormDropdown label="Kategoria źródła" options={evidencesTypes} value={typeOption} setValue={setTypeOption} required submitted={submitted} />
      </FormTwoInLineWrapper>
      <FormSingleLineInput label="Notatka do źródła" value={notes} setValue={setNotes} />
      <FormMultiLineInput label="Wyjaśnienie użycia" value={context} setValue={setContext} />
    </FormModalWrapper>
  )
}

export default SourceForm
