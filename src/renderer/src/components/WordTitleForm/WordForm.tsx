import { Dispatch, SetStateAction, SubmitEvent, useState } from 'react'
import './WordForm.css'
import PillBoxList from '../WordViewer/PillBoxList/PillBoxList'
import AddTagForm from './AddTagForm/AddTagForm'
import { WordWithCounts, WordWithMeaningsDetails } from '@shared/types'

interface WordFormProps {
  wordDetails?: WordWithMeaningsDetails
  setWordDetails?: Dispatch<SetStateAction<WordWithMeaningsDetails | null>>
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  setWordsWithSignCount?: Dispatch<SetStateAction<WordWithCounts[]>>
}

function WordForm(props: WordFormProps): React.JSX.Element {
  const { wordDetails, setWordDetails, setIsFormOpen, setWordsWithSignCount } = props

  const [text, setText] = useState<string>(wordDetails?.text ?? '')
  const [definition, setDefinition] = useState<string>(wordDetails?.definition ?? '')
  const [tags, setTags] = useState<string[]>(wordDetails?.tags || [])
  const [isTagFormOpen, setIsTagFormOpen] = useState<boolean>(false)

  const resetWordValues = (): void => {
    setText('')
    setDefinition('')
    setTags([])
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (wordDetails && setWordDetails) {
      window.api.word
        .update(wordDetails.id, { text, definition, tags })
        .then((word) => setWordDetails({ ...wordDetails, ...word }))
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
      {wordDetails && <h2>{text}</h2>}
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
