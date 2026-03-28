import { Dispatch, SetStateAction, SubmitEvent, useState } from 'react'
import './Form.css'
import PillBoxList from '../WordViewer/PillBoxList/PillBoxList'
import AddTagForm from './AddTagForm/AddTagForm'
import { FormType, Word } from '@shared/types'

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
  const [isTagFormOpen, setIsTagFormOpen] = useState<boolean>(false)

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

  const handleTagAdd = (newTag: string): void => {
    setTags((prevState) => [...prevState, newTag])
  }

  return (
    <div>
      {formType === 'edit' && <h2>{text}</h2>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Słowo</label>
          <input
            className="formInput"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
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
          <button type="submit">{formType === 'edit' ? 'Zapisz słowo' : 'Dodaj słowo'}</button>
          <button type="reset" onClick={() => closeForm()}>
            Anuluj
          </button>
        </div>
      </form>
    </div>
  )
}

export default WordForm
