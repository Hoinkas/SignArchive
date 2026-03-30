import { Dispatch, SetStateAction, SubmitEvent, useEffect, useState } from 'react'
import {
  Author,
  AuthorToDB,
  FormType,
  MediaFileToDB,
  Signer,
  SignerToDB,
  Source,
  SourceToCreate,
  SourceWithDetailsToDB
} from '@shared/types'
import {
  FormModalWrapper,
  FormMultiLineInput,
  FormSingleLineInput,
  FormTwoInLineWrapper
} from '../Form'
import { DropdownOption, FormDropdown } from '../Components/FormDropdown'

interface SourceFormProps {
  signId: string
  source?: Source
  setSourceValues: (source: Source) => void
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function SourceForm(props: SourceFormProps): React.JSX.Element {
  const { signId, source, setSourceValues, formType, setIsFormOpen } = props

  const [notes, setNotes] = useState<string>(source?.notes || '')
  const [region, setRegion] = useState<string>(source?.region || '')
  const [yearStart, setYearStart] = useState<string>(source?.yearStart?.toString || '')
  const [yearEnd, setYearEnd] = useState<string>(source?.yearEnd?.toString || '')

  const [filePath, setFilePath] = useState<string>('')

  const [authorOption, setAuthorOption] = useState<DropdownOption | null>(null)
  const [authors, setAuthors] = useState<Author[]>([])

  const [signerOption, setSignerOption] = useState<DropdownOption | null>(null)
  const [signers, setSigners] = useState<Signer[]>([])

  useEffect(() => {
    window.api.author.list().then((authors) => setAuthors(authors))
    window.api.signer.list().then((signers) => setSigners(signers))

    if (source) {
      window.api.source.details(source.id).then((sourceRecieved) => {
        setFilePath(sourceRecieved.mediaFile.filePath)
        setAuthorOption({ id: sourceRecieved.author.id, label: sourceRecieved.author.name })

        const signerNames = sourceRecieved.signer.name + ' ' + sourceRecieved.signer.surname
        setSignerOption({ id: sourceRecieved.signer.id, label: signerNames })
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
    setSignerOption(null)
    setIsFormOpen(false)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (authorOption) {
      const mediaFile: MediaFileToDB = {
        fileType: 'onlineUrl',
        filePath,
        createDate: new Date().toISOString()
      }
      const author: AuthorToDB = { name: authorOption.label }

      const names = signerOption ? signerOption.label.split(' ') : ['nieznane', 'nieznane']
      const signer: SignerToDB = { name: names[0], surname: names[1] }

      const yearStartStr = yearStart ? parseInt(yearStart) : undefined
      const yearEndStr = yearEnd ? parseInt(yearEnd) : undefined
      const source: SourceToCreate = {
        notes: notes,
        yearStart: yearStartStr,
        yearEnd: yearEndStr,
        region
      }

      const data: SourceWithDetailsToDB = {
        signId,
        source,
        mediaFile,
        author,
        signer
      }

      console.log(signer)

      window.api.source
        .create(data)
        .then((source) => {
          setSourceValues(source)
          closeForm()
        })
        .catch((err) => console.error('Błąd tworzenia źródła:', err))
    }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormSingleLineInput label={'Online Url'} value={filePath} setValue={setFilePath} />
      <FormMultiLineInput label={'Notatka do źródła'} value={notes} setValue={setNotes} />
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
    </FormModalWrapper>
)
}

export default SourceForm
