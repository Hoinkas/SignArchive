import {  type SubmitEvent, type Dispatch, type SetStateAction, useState } from 'react'
import {
  FormMultiLineInput,
  FormModalWrapper,
  FormSingleLineInput,
  FormTwoInLineWrapper,
  FormMedia
} from '@src/components/Form/Form'
import { useWord } from '@src/hooks/WordContext/useWord'
import { useSigns } from '@src/hooks/SignsContext/useSigns'
import { FormCustomInputDropdown } from '../Components/FormCustomInputDropdown'
import type { DropdownOption } from '../Components/FormDropdown'
import { categoriesOptions } from '../Components/DropdownOptions'
import type { FormType } from '@src/models/yearStartEnd.model'
import type { ISignDetailsToDB } from '@src/models/sign.model'
import type { DefinitionsCategories, IDefinition } from '@src/models/definition.model'
import { mediaApi } from '@src/services/media.api'

interface AddSignFormProps {
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function AddSignForm({ formType, setIsFormOpen }: AddSignFormProps): React.JSX.Element {
  const { word } = useWord()
  const { addSign } = useSigns()

  const [newFile, setNewFile] = useState<File | null>(null)
  const [mediaAltText, setMediaAltText] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [translations, setTranslation] = useState<string>('')
  const [categoryOption, setCategoryOption] = useState<DropdownOption | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const closeForm = (): void => {
    setNewFile(null)
    setNotes('')
    setText('')
    setTranslation('')
    setCategoryOption(null)
    setIsFormOpen(false)
  }

  const isValid = newFile && text !== '' && categoryOption && translations !== ''

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid || !word || !newFile) return

    const uploaded = await mediaApi.upload(newFile, mediaAltText !== '' ? mediaAltText : undefined)

    try {
        const definition: IDefinition = {
        category: categoryOption!.label as DefinitionsCategories,
        text,
        translations: translations !== '' ? translations : undefined
      }
      const data: ISignDetailsToDB = {
        wordId: word.id,
        media: uploaded,
        definition,
        notes: notes !== '' ? notes : undefined
      }

      addSign(data, closeForm)
    } catch {
      await mediaApi.delete(uploaded.id)
    }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMedia newFile={newFile} setNewFile={setNewFile} required submitted={submitted} />
      <FormMultiLineInput label="Opis filmu" value={mediaAltText} setValue={setMediaAltText} />
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
        <FormSingleLineInput label="Odpowiednik w pisanym" value={translations} setValue={setTranslation} required submitted={submitted}/>
      </FormTwoInLineWrapper>
    </FormModalWrapper>
  )
}

export default AddSignForm
