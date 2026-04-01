import { useState } from 'react'
import TagList from '../../../components/TagList/TagList'
import './WordTitle.css'
import { Word } from '@shared/types'
import WordTitleForm from '../../../components/Form/Forms/WordForm'
import KebabMenu from '@renderer/components/KebabMenu/KebabMenu'

interface WordTitleProps {
  word: Word
  setWordValues: (word: Word) => void
  handleWordDelete: (deletedId: string) => void
}

function WordTitle(props: WordTitleProps): React.JSX.Element {
  const { word, setWordValues, handleWordDelete } = props
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
            <KebabMenu
              setIsFormOpen={setIsFormOpen}
              handleDelete={() => handleWordDelete(word.id)}
            />
          </div>
          <div className="wordTitleDetails">{word.tags && <TagList textArray={word.tags} />}</div>
        </div>
      )}
    </div>
  )
}

export default WordTitle
