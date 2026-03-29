import { Dispatch, SetStateAction, SubmitEvent, useState } from 'react'
import { FormType, Word } from '@shared/types'
import { FormMultiLineInput, FormSingleLineInput, FormTags, FormWrapper } from '../Form'

interface WordFormProps {
  word?: Word
  setWordValues: (word: Word) => void
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function WordForm(props: WordFormProps): React.JSX.Element {
  const { word, setWordValues, formType, setIsFormOpen } = props

  const [text, setText] = useState<string>(word?.text || '')
  const [definition, setDefinition] = useState<string>(word?.definition || '')
  const [tags, setTags] = useState<string[]>(word?.tags || [])

  const closeForm = (): void => {
    setText('')
    setDefinition('')
    setTags([])
    setIsFormOpen(false)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (formType == 'add') {
      window.api.word.create({ text, definition, tags }).then((word) => setWordValues(word))
    } else if (formType == 'edit' && word) {
      window.api.word
        .update(word.id, { text, definition, tags })
        .then((word) => setWordValues(word))
    }

    closeForm()
  }

  return (
    <div>
      {formType === 'edit' && <h2>{text}</h2>}
      <FormWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
        <FormSingleLineInput label="Słowo" value={text} setValue={setText} />
        <FormMultiLineInput label="Definicja" value={definition} setValue={setDefinition} />
        <FormTags label="Tagi" tags={tags} setTags={setTags} />
      </FormWrapper>
    </div>
  )
}

export default WordForm
