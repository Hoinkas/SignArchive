import { Dispatch, SetStateAction, useState } from 'react'
import PillBoxList from '../PillBoxList/PillBoxList'
import './WordTitle.css'
import { WordWithMeaningsDetails } from '@shared/types'
import WordTitleForm from '../../WordTitleForm/WordForm'
import ActionButtons from './ActionButtons/ActionButtons'

interface WordTitleProps {
  wordDetails: WordWithMeaningsDetails | null
  setWordDetails: Dispatch<SetStateAction<WordWithMeaningsDetails | null>>
}

function WordTitle(props: WordTitleProps): React.JSX.Element {
  const { wordDetails, setWordDetails } = props
  const [isFormOpen, setIsFormOpen] = useState(false)

  console.log(wordDetails)

  if (!wordDetails) return <div className="wordTitle">Brak słowa</div>

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
            <h1>{wordDetails.text}</h1>
            <ActionButtons setIsFormOpen={setIsFormOpen} />
          </div>
          <div className="wordTitleDetails">
            {wordDetails.definition && <div>{wordDetails.definition}</div>}
            {wordDetails.tags && <PillBoxList textArray={wordDetails.tags} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default WordTitle
