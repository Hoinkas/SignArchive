import { SubmitEvent, Dispatch, SetStateAction, useState } from 'react'
import { Definition, DefinitionsCategories, DefinitionToCreate, FormType } from '@shared/types'
import {
  FormMultiLineInput,
  FormModalWrapper,
  FormSingleLineInput
} from '@renderer/components/Form/Form'
import { useDefinitions } from '@contexts/DefinitonsContext/useDefinitions'
import FormDropdown, { DropdownOption } from '../Components/FormDropdown'
import { categoriesOptions } from '../Components/DropdownOptions'

interface DefinitionFormProps {
  definition?: Definition
  formType: FormType
  category?: DefinitionsCategories
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function DefinitonForm(props: DefinitionFormProps): React.JSX.Element {
  const { activeCategory } = useDefinitions()
  const { definition, formType, setIsFormOpen, category } = props
  const { addDefinition, editDefinition } = useDefinitions()

  const findOption = categoriesOptions.find((c) => c.label === (category || activeCategory))

  const [categoryOption, setCategoryOption] = useState<DropdownOption | null>(findOption ?? null)
  const [text, setText] = useState<string>(definition?.text || '')
  const [translation, setTranslation] = useState<string>(definition?.translation || '')

  const closeForm = (): void => {
    setText('')
    setTranslation('')
    setIsFormOpen(false)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (!categoryOption) return
    const definitionToCreate: DefinitionToCreate = {
      category: categoryOption.label as DefinitionsCategories,
      text,
      translation
    }

    if (formType === 'add') {
      addDefinition(definitionToCreate, closeForm)
    } else if (formType === 'edit' && definition) {
      editDefinition(definition.id, definitionToCreate, closeForm)
    }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormDropdown
        label="Kategoria"
        options={categoriesOptions}
        value={categoryOption}
        setValue={setCategoryOption}
      />
      <FormMultiLineInput label="Definicja" value={text} setValue={setText} />
      <FormSingleLineInput
        label="Odpowiednik w pisanym"
        value={translation}
        setValue={setTranslation}
      />
    </FormModalWrapper>
  )
}

export default DefinitonForm
