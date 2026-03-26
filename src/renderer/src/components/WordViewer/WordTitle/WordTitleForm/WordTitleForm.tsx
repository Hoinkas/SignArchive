import { Dispatch, SetStateAction, SubmitEvent, useState } from 'react'
import './WordTitleForm.css'
import { WordWithMeaningsDetails } from '@shared/types'
import PillBoxList from '../../PillBoxList/PillBoxList'
import AddTagForm from './AddTagForm/AddTagForm'

interface WordTitleFormProps {
  wordDetails: WordWithMeaningsDetails
  setWordDetails: Dispatch<SetStateAction<WordWithMeaningsDetails | null>>
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function WordTitleForm(props: WordTitleFormProps): React.JSX.Element {
  const { wordDetails, setWordDetails, setIsFormOpen } = props

  const [text, setText] = useState<string>(wordDetails.text)
  const [definition, setDefinition] = useState<string>(wordDetails.definition ?? '')
  const [tags, setTags] = useState<string[]>(wordDetails.tags || [])
  const [isTagFormOpen, setIsTagFormOpen] = useState<boolean>(false)

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()
    window.api.word
      .update(wordDetails.id, { text, definition, tags })
      .then((word) => setWordDetails({ ...wordDetails, ...word }))
    setIsFormOpen(false)
  }

  const handleTagAdd = (newTag: string): void => {
    setTags((prevState) => [...prevState, newTag])
  }

  return (
    <div className="formContainer">
      <h2>{wordDetails.text}</h2>
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

export default WordTitleForm
