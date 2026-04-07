import { SubmitEvent, Dispatch, SetStateAction, useState } from 'react'
import {
  FormType,
  SignFile,
  SignToDB,
  SignDetailsToDB,
  DefinitionsCategories,
  DefinitionToCreate
} from '@shared/types'
import {
  FormMultiLineInput,
  FormModalWrapper,
  FormMediaFile,
  FormSingleLineInput,
  FormTwoInLineWrapper
} from '@renderer/components/Form/Form'
import { useWord } from '@contexts/WordContext/useWord'
import { useSigns } from '@contexts/SignsContext/useSigns'
import { FormCustomInputDropdown } from '../Components/FormCustomInputDropdown'
import { DropdownOption } from '../Components/FormDropdown'
import { categoriesOptions } from '../Components/DropdownOptions'

interface AddSignFormProps {
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function AddSignForm(props: AddSignFormProps): React.JSX.Element {
  const { formType, setIsFormOpen } = props
  const { word } = useWord()
  const { addSign } = useSigns()

  const [newFile, setNewFile] = useState<File | null>(null)
  const [notes, setNotes] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [translation, setTranslation] = useState<string>('')
  const [categoryOption, setCategoryOption] = useState<DropdownOption | null>(null)

  const closeForm = (): void => {
    setNewFile(null)
    setNotes('')
    setText('')
    setTranslation('')
    setCategoryOption(null)
    setIsFormOpen(false)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (!newFile || !categoryOption || !word || text === '') return

    const signFile: SignFile = {
      path: window.api.getPathForFile(newFile),
      originalName: newFile.name,
      mimeType: newFile.type,
      size: newFile.size
    }

    const sign: SignToDB = { notes, file: JSON.stringify(signFile) }
    const definition: DefinitionToCreate = {
      category: categoryOption.label as DefinitionsCategories,
      text,
      translation
    }
    const data: SignDetailsToDB = { wordId: word.id, sign, definition }

    addSign(data, closeForm)
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMediaFile newFile={newFile} setNewFile={setNewFile} />
      <FormMultiLineInput label="Notatka do znaku" value={notes} setValue={setNotes} />
      <FormMultiLineInput label="Definicja" value={text} setValue={setText} />
      <FormTwoInLineWrapper>
        <FormCustomInputDropdown
          label="Kategoria słowa"
          options={categoriesOptions}
          value={categoryOption}
          setValue={setCategoryOption}
        />
        <FormSingleLineInput
          label="Odpowiednik w pisanym"
          value={translation}
          setValue={setTranslation}
        />
      </FormTwoInLineWrapper>
    </FormModalWrapper>
  )
}

export default AddSignForm
