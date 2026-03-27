import { Dispatch, SetStateAction, useState } from 'react'
import PillBoxList from '../PillBoxList/PillBoxList'
import './WordTitle.css'
import { WordToDB } from '@shared/types'
import WordTitleForm from '../../WordTitleForm/WordForm'
import ActionButtons from './ActionButtons/ActionButtons'

interface WordTitleProps {
  word: WordToDB | null
  setWord: Dispatch<SetStateAction<WordToDB | null>>
}

function WordTitle(props: WordTitleProps): React.JSX.Element {
  const { word, setWord } = props
  const [isFormOpen, setIsFormOpen] = useState(false)

  if (!word) return <div className="wordTitle">Brak słowa</div>

  return (
    <div className="wordTitle">
      {isFormOpen ? (
        <WordTitleForm word={word} setWord={setWord} setIsFormOpen={setIsFormOpen} />
      ) : (
        <div>
          <div className="wordTitleWithButtons">
            <h1>{word.text}</h1>
            <ActionButtons setIsFormOpen={setIsFormOpen} />
          </div>
          <div className="wordTitle">
            {word.definition && <div>{word.definition}</div>}
            {word.tags && <PillBoxList textArray={word.tags} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default WordTitle
