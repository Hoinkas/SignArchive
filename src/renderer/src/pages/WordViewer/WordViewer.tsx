import { useState } from 'react'
import './WordViewer.css'
import WordTitle from './WordTitle/WordTitle'
import SignList from './SignList/SignList'
import AddSignForm from '@renderer/components/Form/Forms/AddSignForm'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import { useWord } from '@contexts/WordContext/useWord'

function WordViewer(): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const { activeWord, wordDetails, editSign, deleteSign } = useWord()

  if (!activeWord || !wordDetails) return <div>Error</div>

  return (
    <div className="wordViewer">
      <WordTitle word={wordDetails} />
      <SignList
        wordId={wordDetails.id}
        signs={wordDetails.signs}
        setSignValues={editSign}
        handleSignDelete={deleteSign}
      />

      {isFormOpen ? (
        <AddSignForm
          wordId={activeWord.id}
          formType="add"
          setSignValues={editSign}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <ActionButton setIsFormOpen={setIsFormOpen} text={'Dodaj znak'} isAtEnd={true} />
      )}
    </div>
  )
}

export default WordViewer
