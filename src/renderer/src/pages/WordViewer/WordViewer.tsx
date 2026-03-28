import { useEffect, useState } from 'react'
import './WordViewer.css'
import { Meaning, SignWithSourceDetails, Word, WordWithMeaningsDetails } from '@shared/types'
import WordTitle from './WordTitle/WordTitle'
import MeaningForm from '../../components/Form/Forms/MeaningForm'
import MeaningList from './MeaningList/MeaningList'
import ActionButton from '../../components/ActionButton/ActionButton'

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

  const setSignValues = (meaningId: string, sign: SignWithSourceDetails): void => {
    setWordDetails((prevState) => {
      if (!prevState) return null
      return {
        ...prevState,
        meanings: prevState.meanings.map((m) => {
          if (m.id !== meaningId) return m

          const exists = m.signs.some((s) => s.id === sign.id)
          return {
            ...m,
            signs: exists
              ? m.signs.map((s) => (s.id === sign.id ? { ...s, ...sign } : s))
              : [...m.signs, sign]
          }
        })
      }
    })
  }

  if (!wordDetails) return <div>Loading Error</div>

  return (
    <div className="wordViewer">
      <WordTitle word={wordDetails} setWordValues={setWordValues} />
      <MeaningList
        wordDetails={wordDetails}
        setMeaningValues={setMeaningValues}
        setSignValues={setSignValues}
      />

      <div className="actionButton">
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
