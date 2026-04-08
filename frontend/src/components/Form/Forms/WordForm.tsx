import { type SubmitEvent, type Dispatch, type SetStateAction, useState } from 'react'
import type { FormType, IWordAttached } from '@shared/types'
import { FormSingleLineInput, FormTags, FormWrapper } from '../Form'
import { useWord } from '@src/hooks/WordContext/useWord'
import { useTags } from '@src/hooks/TagsContext/useTags'

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
      addWord({ text, tagIds: tags.map((t) => t.id) }, closeForm)
    } else if (formType === 'edit' && word) {
      editWord({ text, tagIds: tags.map((t) => t.id) }, closeForm)
    }
  }

  return (
    <div>
      {formType === 'edit' && <h2>{text}</h2>}
      <FormWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
        <FormSingleLineInput
          label="Słowo"
          value={text}
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
