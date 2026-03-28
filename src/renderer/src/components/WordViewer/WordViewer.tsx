import { useEffect, useState } from 'react'
import './WordViewer.css'
import { Meaning, Word, WordWithMeaningsDetails } from '@shared/types'
import WordTitle from './WordTitle/WordTitle'
import MeaningForm from './MeaningForm/MeaningForm'
import MeaningList from './MeaningList/MeaningList'
import ActionButton from '../ActionButton/ActionButton'

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
    setWordDetails((prevState) => {
      if (!prevState) return null
      return {
        ...prevState,
        meanings: prevState.meanings.map((m) => (m.id === meaning.id ? { ...m, ...meaning } : m))
      }
    })
  }

  if (!wordDetails) return <div>Loading Error</div>

  return (
    <div className="wordViewer">
      <WordTitle word={wordDetails} setWordValues={setWordValues} />
      <MeaningList wordDetails={wordDetails} setMeaningValues={setMeaningValues} />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ActionButton text="Dodaj znaczenie" setIsFormOpen={setIsFormOpen} />
      </div>

      {isFormOpen && (
        <MeaningForm
          wordId={word.id}
          setIsFormOpen={setIsFormOpen}
          setMeaningValues={setMeaningValues}
          formType="add"
        />
      )}
    </div>
  )
}

export default WordViewer
