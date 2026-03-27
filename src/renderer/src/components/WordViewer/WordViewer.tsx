import { useEffect, useState } from 'react'
import './WordViewer.css'
import { Meaning, MeaningWithSignsDetails, Word, WordWithMeaningsDetails } from '@shared/types'
import WordTitle from './WordTitle/WordTitle'
import AddButton from '../AddButton/AddButton'
import MeaningForm from './MeaningForm/MeaningForm'
import MeaningList from './MeaningList/MeaningList'

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
      if (!prevState) return null
      return { ...prevState, ...word }
    })
  }

  const setMeaningValues = (meaning: Meaning): void => {
    const meaningWithSigns: MeaningWithSignsDetails = { ...meaning, signs: [] }

    setWordDetails((prevState) => {
      if (!prevState) return null
      return {
        ...prevState,
        meanings: [...prevState.meanings, meaningWithSigns],
      }
    })
  }

  if (!wordDetails) return <div>Loading Error</div>

  return (
    <div className="wordViewer">
      <WordTitle word={wordDetails} setWordValues={setWordValues} />
      <MeaningList wordDetails={wordDetails} />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AddButton formVariant="meaning" setIsFormOpen={setIsFormOpen} />
      </div>

      {isFormOpen && (
        <div className="wordFormContainer">
          <div className="wordForm">
            <MeaningForm
              wordId={word.id}
              setIsFormOpen={setIsFormOpen}
              setMeaningValues={setMeaningValues}
              formType="add"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default WordViewer
