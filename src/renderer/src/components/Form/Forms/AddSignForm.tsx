import { Dispatch, SetStateAction, SubmitEvent, useEffect, useState } from 'react'
import {
  Author,
  AuthorToDB,
  FormType,
  MediaFileToDB,
  Signer,
  SignerToDB,
  SignToDB,
  SignWithDetailsToDB,
  SignWithSourceDetails,
  SourceToCreate
} from '@shared/types'
import {
  FormMultiLineInput,
  FormModalWrapper,
  FormMediaFile,
  FormSingleLineInput,
  FormTwoInLineWrapper
} from '@renderer/components/Form/Form'
import { DropdownOption, FormDropdown } from '../Components/FormDropdown'

interface AddSignFormProps {
  meaningId: string
  setSignValues: (sign: SignWithSourceDetails) => void
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function AddSignForm(props: AddSignFormProps): React.JSX.Element {
  const { meaningId, setSignValues, formType, setIsFormOpen } = props

  const [notes, setNotes] = useState<string>('')
  const [sourceNotes, setSourceNotes] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [filePath, setFilePath] = useState<string>('')
  const [region, setRegion] = useState<string>('')
  const [yearStart, setYearStart] = useState<string>('')
  const [yearEnd, setYearEnd] = useState<string>('')

  const [authorOption, setAuthorOption] = useState<DropdownOption | null>(null)
  const [authors, setAuthors] = useState<Author[]>([])

  const [signerOption, setSignerOption] = useState<DropdownOption | null>(null)
  const [signers, setSigners] = useState<Signer[]>([])

  const closeForm = (): void => {
    setNotes('')
    setIsFormOpen(false)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (file && authorOption && signerOption) {
      const sign: SignToDB = { notes }
      const mediaFile: MediaFileToDB = {
        fileType: file?.type,
        filePath: window.api.getPathForFile(file),
        createDate: new Date(file.lastModified).toISOString()
      }
      const yearStartStr = yearStart ? parseInt(yearStart) : undefined
      const yearEndStr = yearEnd ? parseInt(yearEnd) : undefined
      const source: SourceToCreate = {
        notes: sourceNotes,
        yearStart: yearStartStr,
        yearEnd: yearEndStr,
        region
      }
      const author: AuthorToDB = { name: authorOption.label }

      const names = signerOption.label.split(' ')
      const signer: SignerToDB = { name: names[0], surname: names[1] }

      const data: SignWithDetailsToDB = { meaningId, sign, mediaFile, author, signer, source }

      window.api.sign
        .create(data)
        .then((sign) => {
          setSignValues(sign)
          closeForm()
        })
        .catch((err) => console.error('Błąd tworzenia znaku:', err))
    }
  }

  useEffect(() => {
    window.api.author.list().then((authors) => setAuthors(authors))
    window.api.signer.list().then((signers) => setSigners(signers))
  }, [])

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMediaFile file={file} setFile={setFile} />
      <FormSingleLineInput label={'Online Url'} value={filePath} setValue={setFilePath} />
      <FormMultiLineInput
        label={'Notatka do źródła'}
        value={sourceNotes}
        setValue={setSourceNotes}
      />
      <FormTwoInLineWrapper>
        <FormDropdown
          label="Migacz"
          options={signers.map((a) => ({ id: a.id, label: a.name + ' ' + a.surname }))}
          value={signerOption}
          setValue={setSignerOption}
        />
        <FormDropdown
          label="Autor / publikacja"
          options={authors.map((a) => ({ id: a.id, label: a.name }))}
          value={authorOption}
          setValue={setAuthorOption}
        />
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
      <FormSingleLineInput label={'Region'} value={region} setValue={setRegion} />
      <FormMultiLineInput label={'Notatka do znaku'} value={notes} setValue={setNotes} />
    </FormModalWrapper>
  )
}

export default AddSignForm
