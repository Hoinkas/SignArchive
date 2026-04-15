import { type SubmitEvent, type Dispatch, type SetStateAction, useState } from 'react'
import {
  FormMultiLineInput,
  FormModalWrapper,
  FormSingleLineInput
} from '@src/components/Form/Form'
import { useDefinitions } from '@src/hooks/DefinitonsContext/useDefinitions'
import FormDropdown, { type DropdownOption } from '../Components/FormDropdown'
import { categoriesOptions } from '../Components/DropdownOptions'
import type { DefinitionsCategories, IDefinition, IDefinitionAttached } from '@src/models/definition.model'
import type { FormType } from '@src/models/yearStartEnd.model'

interface DefinitionFormProps {
  definition?: IDefinitionAttached
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
  const [translations, setTranslation] = useState<string>(definition?.translations || '')
  const [submitted, setSubmitted] = useState(false)

  const closeForm = (): void => {
    setText('')
    setTranslation('')
    setIsFormOpen(false)
  }

  const isValid = categoryOption && text

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    if (!categoryOption) return
    const definitionToCreate: IDefinition = {
      category: categoryOption.label as DefinitionsCategories,
      text,
      translations: translations !== '' ? translations : undefined
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
        required
        submitted={submitted}
      />
      <FormMultiLineInput
        label="Definicja"
        value={text}
        setValue={setText}
        required
        submitted={submitted}
      />
      <FormSingleLineInput
        label="Odpowiednik w pisanym"
        value={translations}
        setValue={setTranslation}
      />
    </FormModalWrapper>
  )
}

export default DefinitonForm
