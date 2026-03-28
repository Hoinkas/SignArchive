import { useState } from 'react'
import TagList from '../../../components/TagList/TagList'
import './WordTitle.css'
import { Word } from '@shared/types'
import WordTitleForm from '../../../components/Form/Forms/WordForm'
import ActionButton from '@renderer/components/ActionButton/ActionButton'

interface WordTitleProps {
  word: Word
  setWordValues: (word: Word) => void
}

function WordTitle(props: WordTitleProps): React.JSX.Element {
  const { word, setWordValues } = props
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="wordTitle">
      {isFormOpen ? (
        <WordTitleForm
          word={word}
          setWordValues={setWordValues}
          setIsFormOpen={setIsFormOpen}
          formType="edit"
        />
      ) : (
        <div>
          <div className="wordTitleWithButtons">
            <h1>{word.text}</h1>
            <ActionButton text="edytuj" setIsFormOpen={setIsFormOpen} />
          </div>
          <div className="wordTitleDetails">
            {word.definition && <div>{word.definition}</div>}
            {word.tags && <TagList textArray={word.tags} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default WordTitle
