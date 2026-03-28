import { Dispatch, SetStateAction, SubmitEvent, useEffect, useState } from 'react'
import { Author, FormType, Signer, SignWithSourceDetails } from '@shared/types'
import {
  FormMultiLineInput,
  FormModalWrapper,
  FormMediaFile,
  FormSingleLineInput,
  FormSingleLineNumberInput,
  FormTwoInLineWrapper
} from '@renderer/components/Form/Form'
import { DropdownOption, FormDropdown } from '../Components/FormDropdown'

interface SignFormProps {
  meaningId?: string
  sign?: SignWithSourceDetails
  setSignValues: (sign: SignWithSourceDetails) => void
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function SignForm(props: SignFormProps): React.JSX.Element {
  const { meaningId, sign, setSignValues, formType, setIsFormOpen } = props

  const [notes, setNotes] = useState<string>(sign?.notes || '')
  const [file, setFile] = useState<File | null>(null)
  const [onlineUrl, setOnlineUrl] = useState<string>(sign?.mainSource.mediaFile?.onlineUrl || '')
  const [region, setRegion] = useState<string>(sign?.mainSource.region || '')
  const [yearStart, setYearStart] = useState<string>(sign?.mainSource.yearStart?.toString() || '')
  const [yearEnd, setYearEnd] = useState<string>(sign?.mainSource.yearEnd?.toString() || '')

  const [author, setAuthor] = useState<DropdownOption | null>(null)
  const [authors, setAuthors] = useState<Author[]>([])

  const [signer, setSigner] = useState<DropdownOption | null>(null)
  const [signers, setSigners] = useState<Signer[]>([])

  const closeForm = (): void => {
    setNotes('')
    setIsFormOpen(false)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    // if (formType == 'add' && meaningId) {
    //   window.api.sign.create({ meaningId, notes }).then((sign) => setSignValues(sign))
    // } else if (formType == 'edit' && sign) {
    //   window.api.sign.update(sign.id, { notes }).then((sign) => setSignValues(sign))
    // }

    closeForm()
  }

  useEffect(() => {
    window.api.author.list().then((authors) => setAuthors(authors))
    window.api.signer.list().then((signers) => setSigners(signers))
  }, [])

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMediaFile file={file} setFile={setFile} />
      <FormSingleLineInput label={'Online Url'} value={onlineUrl} setValue={setOnlineUrl} />
      <FormMultiLineInput label={'Notatka'} value={notes} setValue={setNotes} />
      <FormTwoInLineWrapper>
        <FormDropdown
          label="Migacz"
          options={authors.map((a) => ({ id: a.id, label: a.name }))}
          value={author}
          setValue={setAuthor}
        />
        <FormDropdown
          label="Autor / publikacja"
          options={signers.map((a) => ({ id: a.id, label: a.name }))}
          value={signer}
          setValue={setSigner}
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

export default SignForm
