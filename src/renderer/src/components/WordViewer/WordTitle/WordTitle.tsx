import { Dispatch, SetStateAction, useState } from 'react'
import PillBoxList from '../PillBoxList/PillBoxList'
import './WordTitle.css'
import { Word, WordWithMeaningsDetails } from '@shared/types'
import WordTitleForm from '../../WordForm/WordForm'
import ActionButtons from './ActionButtons/ActionButtons'

interface WordTitleProps {
  wordDetails: WordWithMeaningsDetails
  setWordDetails: Dispatch<SetStateAction<WordWithMeaningsDetails | null>>
}

function WordTitle(props: WordTitleProps): React.JSX.Element {
  const { wordDetails, setWordDetails } = props
  const [isFormOpen, setIsFormOpen] = useState(false)

  const setWordValues = (word: Word): void => {
    setWordDetails({ ...wordDetails, ...word })
  }

  return (
    <div className="wordTitle">
      {isFormOpen ? (
        <WordTitleForm
          word={wordDetails}
          setWordValues={setWordValues}
          setIsFormOpen={setIsFormOpen}
          formType="edit"
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
