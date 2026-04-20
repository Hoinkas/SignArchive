import { useSign } from "@src/hooks/SignContext/useSign"
import type { IReference, ReferenceType } from "@src/models/reference.model"
import type { ISourceDetails, ISourceToDB, ISourceWithDetailsToDB } from "@src/models/source.model"
import type { FormType } from "@src/models/yearStartEnd.model"
import { regionApi } from "@src/services/region.api"
import { type Dispatch, type SetStateAction, useState, useEffect } from "react"
import { evidencesTypes, type DropdownOption } from "../Components/DropdownOptions"
import FormDropdown from "../Components/FormDropdown"
import FormTags from "../Components/FormTags"
import { FormModalWrapper, FormSingleLineInput, FormMultiLineInput, FormTwoInLineWrapper } from "../Form"


interface SourceFormProps {
  source?: ISourceDetails
  meaningId: string
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function SourceForm({ source, meaningId, formType, setIsFormOpen }: SourceFormProps): React.JSX.Element {
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
    setIsFormOpen(false)
  }

  const isValid = referenceName && referenceFullName && typeOption && context

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
      <FormMultiLineInput label="Wyjaśnienie użycia" value={context} setValue={setContext} required submitted={submitted} />
    </FormModalWrapper>
  )
}

export default SourceForm
