import { Dispatch, SetStateAction, SubmitEvent, useState } from 'react'
import './WordForm.css'
import PillBoxList from '../WordViewer/PillBoxList/PillBoxList'
import AddTagForm from './AddTagForm/AddTagForm'
import { Word, WordWithCounts } from '@shared/types'

interface WordFormProps {
  word?: Word
  setWord?: Dispatch<SetStateAction<Word | null>>
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  setWordsWithSignCount?: Dispatch<SetStateAction<WordWithCounts[]>>
}

function WordForm(props: WordFormProps): React.JSX.Element {
  const { word, setWord, setIsFormOpen, setWordsWithSignCount } = props

  const [text, setText] = useState<string>(word?.text ?? '')
  const [definition, setDefinition] = useState<string>(word?.definition ?? '')
  const [tags, setTags] = useState<string[]>(word?.tags || [])
  const [isTagFormOpen, setIsTagFormOpen] = useState<boolean>(false)

  const resetWordValues = (): void => {
    setText('')
    setDefinition('')
    setTags([])
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (word && setWord) {
      window.api.word
        .update(word.id, { text, definition, tags })
        .then((word) => setWord({ ...word, ...word }))
    }
    if (setWordsWithSignCount) {
      window.api.word
        .create({ text, definition, tags })
        .then((word) =>
          setWordsWithSignCount((prevState) => [
            ...prevState,
            { ...word, meaningsCount: 0, signsCount: 0 }
          ])
        )
    }

    resetWordValues()
    setIsFormOpen(false)
  }

  const handleTagAdd = (newTag: string): void => {
    setTags((prevState) => [...prevState, newTag])
  }

  return (
    <div className="formContainer">
      {word && <h2>{text}</h2>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Słowo</label>
          <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
        </div>
        <div className="formGroup">
          <label>Definicja</label>
          <textarea onChange={(event) => setDefinition(event.target.value)} value={definition} />
        </div>
        <div className="formGroup">
          <label>Tagi</label>
          <div className="tagsGroup">
            <PillBoxList textArray={tags} setTags={setTags} />
            {isTagFormOpen ? (
              <AddTagForm handleTagAdd={handleTagAdd} setIsTagFormOpen={setIsTagFormOpen} />
            ) : (
              <button type="button" onClick={() => setIsTagFormOpen(true)}>
                +dodaj tag
              </button>
            )}
          </div>
        </div>
        <div className="buttonGroup">
          <button type="submit">Zapisz</button>
          <button type="reset" onClick={() => setIsFormOpen(false)}>
            Anuluj
          </button>
        </div>
      </form>
    </div>
  )
}

export default WordForm
