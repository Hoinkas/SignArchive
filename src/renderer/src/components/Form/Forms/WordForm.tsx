import { Dispatch, SetStateAction, useState } from 'react'
import { FormType, Word } from '@shared/types'
import { FormSingleLineInput, FormTags, FormWrapper } from '../Form'
import { useWord } from '@contexts/WordContext/useWord'

interface WordFormProps {
  word?: Word
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function WordForm(props: WordFormProps): React.JSX.Element {
  const { word, formType, setIsFormOpen } = props
  const { addWord, setWordValues } = useWord()

  const [text, setText] = useState<string>(word?.text || '')
  const [tags, setTags] = useState<string[]>(word?.tags || [])

  const closeForm = (): void => {
    setText('')
    setTags([])
    setIsFormOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (formType === 'add') {
      window.api.word.create({ text, tags }).then((word) => addWord(word))
    } else if (formType === 'edit' && word) {
      window.api.word.update(word.id, { text, tags }).then((updated) => setWordValues(updated))
    }

    closeForm()
  }

  return (
    <div>
      {formType === 'edit' && <h2>{text}</h2>}
      <FormWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
        <FormSingleLineInput label="Słowo" value={text} setValue={setText} />
        <FormTags label="Tagi" tags={tags} setTags={setTags} />
      </FormWrapper>
    </div>
  )
}

export default WordForm
