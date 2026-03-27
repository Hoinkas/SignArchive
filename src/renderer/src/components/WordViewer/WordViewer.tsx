import { useEffect, useState } from 'react'
import './WordViewer.css'
import { Word, WordWithMeaningsDetails } from '@shared/types'
import MeaningBox from './MeaningBox/MeaningBox'
import WordTitle from './WordTitle/WordTitle'
import AddButton from '../AddButton/AddButton'
import WordForm from '../WordForm/WordForm'

interface WordViewerProps {
  word: Word
}

function WordViewer({ word }: WordViewerProps): React.JSX.Element {
  const [wordDetails, setWordDetails] = useState<WordWithMeaningsDetails | null>(null)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  useEffect(() => {
    window.api.word.details(word.id).then(setWordDetails)
  }, [word.id])

  const setWordValues = (word: Word): void => {
    setWordDetails((prevState) => {
      return { ...prevState, ...word, meanings: prevState?.meanings || [] }
    })
  }

  if (!wordDetails || !setWordDetails) return <div>ERROR</div>

  return (
    <div className="wordViewer">
      <WordTitle word={wordDetails} setWordValues={setWordValues} />

      <div className="meaningList">
        {wordDetails.meanings.map((meaning, key) => (
          <MeaningBox key={key} meaningWithSigns={meaning} number={key} />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AddButton formVariant="meaning" setIsFormOpen={setIsFormOpen} />
      </div>

      {isFormOpen && (
        <div className="wordFormContainer">
          <div className="wordForm">
            <WordForm setIsFormOpen={setIsFormOpen} setWordValues={setWordValues} formType="add" />
          </div>
        </div>
      )}
    </div>
  )
}

export default WordViewer
