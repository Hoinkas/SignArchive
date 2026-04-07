import { Dispatch, SetStateAction, useState } from 'react'
import { FormType, WordToDB, Word } from '@shared/types'
import { FormSingleLineInput, FormTags, FormWrapper } from '../Form'
import { useWord } from '@contexts/WordContext/useWord'

interface WordFormProps {
  word?: Word
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function WordForm(props: WordFormProps): React.JSX.Element {
  const { word, formType, setIsFormOpen } = props
  const { addWord, editWord } = useWord()

  const [text, setText] = useState<string>(word?.text || '')

  const closeForm = (): void => {
    setText('')
    setIsFormOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (formType === 'add') {
      const newWord: WordToDB = { text }
      addWord(newWord, closeForm)
    } else if (formType === 'edit' && word) {
      const updateWord: WordToDB = { ...word, text }
      editWord(updateWord, closeForm)
    }
  }

  return (
    <div>
      {formType === 'edit' && <h2>{text}</h2>}
      <FormWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
        <FormSingleLineInput label="Słowo" value={text} setValue={setText} />
        <FormTags label="Tagi" />
      </FormWrapper>
    </div>
  )
}

export default WordForm
