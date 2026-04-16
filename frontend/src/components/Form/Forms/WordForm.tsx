import { type SubmitEvent, type Dispatch, type SetStateAction, useState } from 'react'
import { FormSingleLineInput, FormTags, FormWrapper } from '../Form'
import { useWord } from '@src/hooks/WordContext/useWord'
import type { IWordAttached } from '@src/models/word.model'
import type { FormType } from '@src/models/yearStartEnd.model'
import { useTags } from '@src/hooks/TagsContext/useTags'
import { titleCase } from '@src/utils/namesHelpers'

interface WordFormProps {
  word?: IWordAttached
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function WordForm(props: WordFormProps): React.JSX.Element {
  const { word, formType, setIsFormOpen } = props
  const { tags } = useTags()
  const { addWord, editWord } = useWord()

  const [text, setText] = useState<string>(word?.text || '')
  const [submitted, setSubmitted] = useState(false)

  const closeForm = (): void => {
    setText('')
    setIsFormOpen(false)
  }

  const isValid = text.trim() !== ''

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    if (formType === 'add') {
      addWord({ text }, tags, closeForm)
    } else if (formType === 'edit' && word) {
      editWord({ text }, tags,  closeForm)
    }
  }

  const fixedText = text !== '' ? titleCase(text) : ''

  return (
    <div>
      {formType === 'edit' && <h2>{fixedText}</h2>}
      <FormWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
        <FormSingleLineInput
          label="Słowo"
          value={fixedText}
          setValue={setText}
          required
          submitted={submitted}
        />
        <FormTags label="Tagi" />
      </FormWrapper>
    </div>
  )
}

export default WordForm
