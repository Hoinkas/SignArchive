import {  type SubmitEvent, type Dispatch, type SetStateAction, useState } from 'react'
import type { DefinitionsCategories, DefinitionToCreate, SignDetailsToDB, SignFile, FormType } from '@shared/types'
import {
  FormMultiLineInput,
  FormModalWrapper,
  FormSingleLineInput,
  FormTwoInLineWrapper
} from '@src/components/Form/Form'
import { useWord } from '@src/hooks/WordContext/useWord'
import { useSigns } from '@src/hooks/SignsContext/useSigns'
import { FormCustomInputDropdown } from '../Components/FormCustomInputDropdown'
import type { DropdownOption } from '../Components/FormDropdown'
import { categoriesOptions } from '../Components/DropdownOptions'

interface AddSignFormProps {
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function AddSignForm({ formType, setIsFormOpen }: AddSignFormProps): React.JSX.Element {
  const { word } = useWord()
  const { addSign } = useSigns()

  const [url, setUrl] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [translation, setTranslation] = useState<string>('')
  const [categoryOption, setCategoryOption] = useState<DropdownOption | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const closeForm = (): void => {
    setUrl('')
    setNotes('')
    setText('')
    setTranslation('')
    setCategoryOption(null)
    setIsFormOpen(false)
  }

  const isValid = url !== '' && text !== '' && categoryOption !== null

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid || !word) return

    const signFile: SignFile = { url, name: undefined, mediaType: "video/mp4" }
    const definition: DefinitionToCreate = {
      category: categoryOption!.label as DefinitionsCategories,
      text,
      translation
    }
    const data: SignDetailsToDB = { wordId: word.id, sign: signFile, definition }

    addSign(data, closeForm)
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormSingleLineInput label="URL do filmu" value={url} setValue={setUrl} required submitted={submitted} />
      <FormMultiLineInput label="Notatka do znaku" value={notes} setValue={setNotes} />
      <FormMultiLineInput label="Definicja" value={text} setValue={setText} required submitted={submitted} />
      <FormTwoInLineWrapper>
        <FormCustomInputDropdown
          label="Kategoria słowa"
          options={categoriesOptions}
          value={categoryOption}
          setValue={setCategoryOption}
          required
          submitted={submitted}
        />
        <FormSingleLineInput label="Odpowiednik w pisanym" value={translation} setValue={setTranslation} />
      </FormTwoInLineWrapper>
    </FormModalWrapper>
  )
}

export default AddSignForm
