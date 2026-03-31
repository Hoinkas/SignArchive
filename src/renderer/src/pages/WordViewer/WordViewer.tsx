import { useEffect, useState } from 'react'
import './WordViewer.css'
import { SignWithDetails, Word, WordWithSignsDetails } from '@shared/types'
import WordTitle from './WordTitle/WordTitle'
import SignList from './SignList/SignList'
import AddSignForm from '@renderer/components/Form/Forms/AddSignForm'
import ActionButton from '@renderer/components/ActionButton/ActionButton'

interface WordViewerProps {
  word: Word
}

function WordViewer({ word }: WordViewerProps): React.JSX.Element {
  const [wordDetails, setWordDetails] = useState<WordWithSignsDetails | null>(null)
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

  const setSignValues = (sign: SignWithDetails): void => {
    setWordDetails((prevState) => {
      if (!prevState) return null

      const exists = prevState.signs.some((s) => s.id === sign.id)

      return {
        ...prevState,
        signs: exists
          ? prevState.signs.map((s) => (s.id === sign.id ? { ...s, ...sign } : s))
          : [...prevState.signs, sign]
      }
    })
  }

  if (!wordDetails) return <div>Loading Error</div>

  return (
    <div className="wordViewer">
      <WordTitle word={wordDetails} setWordValues={setWordValues} />
      <SignList wordId={wordDetails.id} signs={wordDetails.signs} setSignValues={setSignValues} />

      {isFormOpen ? (
        <AddSignForm
          wordId={word.id}
          formType="add"
          setSignValues={setSignValues}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <ActionButton setIsFormOpen={setIsFormOpen} text={'Dodaj znak'} isAtEnd={true}/>
      )}
    </div>
  )
}

export default WordViewer
