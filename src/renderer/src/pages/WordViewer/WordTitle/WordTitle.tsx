import { useState } from 'react'
import TagList from '../../../components/TagList/TagList'
import './WordTitle.css'
import { Word } from '@shared/types'
import WordTitleForm from '../../../components/Form/Forms/WordForm'
import KebabMenu from '@renderer/components/KebabMenu/KebabMenu'
import { useWord } from '@contexts/WordContext/useWord'

interface WordTitleProps {
  word: Word
}

function WordTitle(props: WordTitleProps): React.JSX.Element {
  const { word } = props
  const { deleteWord } = useWord()
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="wordTitle">
      {isFormOpen ? (
        <WordTitleForm word={word} setIsFormOpen={setIsFormOpen} formType="edit" />
      ) : (
        <div>
          <div className="wordTitleWithButtons">
            <h1>{word.text}</h1>
            <KebabMenu setIsFormOpen={setIsFormOpen} handleDelete={() => deleteWord()} />
          </div>
          <div className="wordTitleDetails">{word.tags && <TagList textArray={word.tags} />}</div>
        </div>
      )}
    </div>
  )
}

export default WordTitle
