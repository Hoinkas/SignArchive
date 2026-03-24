import { Dispatch, SetStateAction, useState } from 'react'
import PillBoxList from '../PillBoxList/PillBoxList'
import './WordTitle.css'
import { WordWithDetails } from '@shared/types'
import WordTitleForm from './WordTitleForm/WordTitleForm'
import ActionButtons from './ActionButtons/ActionButtons'

interface WordTitleProps {
  wordDetails: WordWithDetails | null
  setWordDetails: Dispatch<SetStateAction<WordWithDetails | null>>
  setIsComparsionActive: Dispatch<SetStateAction<boolean>>
}

function WordTitle(props: WordTitleProps): React.JSX.Element {
  const { wordDetails, setWordDetails, setIsComparsionActive } = props
  const [isFormOpen, setIsFormOpen] = useState(false)

  if (!wordDetails) return <div className="wordTitle">Brak słowa</div>

  const word = wordDetails.word

  return (
    <div className="wordTitle">
      {isFormOpen ? (
        <WordTitleForm
          wordDetails={wordDetails}
          setWordDetails={setWordDetails}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <div>
          <div className="wordTitleWithButtons">
            <h1>{word.text}</h1>
            <ActionButtons
              setIsFormOpen={setIsFormOpen}
              setIsComparsionActive={setIsComparsionActive}
            />
          </div>
          <div className="wordTitleDetails">
            {word.definition && <div>{word.definition}</div>}
            <PillBoxList textArray={word.tags} />
          </div>
        </div>
      )}
    </div>
  )
}

export default WordTitle
