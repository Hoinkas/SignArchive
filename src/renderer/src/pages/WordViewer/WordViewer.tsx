import { useEffect, useState } from 'react'
import './WordViewer.css'
import WordTitle from './WordTitle/WordTitle'
import SignList from './SignList/SignList'
import AddSignForm from '@renderer/components/Form/Forms/AddSignForm'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import { useWord } from '@contexts/WordContext/useWord'
import { useSigns } from '@contexts/SignsContext/useSigns'
import SourcesProvider from '@contexts/SourcesContext/SourcesProvider'

function WordViewer(): React.JSX.Element {
  const { word } = useWord()
  const { initiateSigns } = useSigns()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!word) return
    initiateSigns(word.id)
  }, [initiateSigns, word])

  if (!word) return <div>Error</div>

  return (
    <div className="wordViewer">
      <WordTitle word={word} />
      <SourcesProvider>
        <SignList />
      </SourcesProvider>
      {isFormOpen ? (
        <AddSignForm formType="add" setIsFormOpen={setIsFormOpen} />
      ) : (
        <ActionButton setIsFormOpen={setIsFormOpen} text={'Dodaj znak'} isAtEnd={true} />
      )}
    </div>
  )
}

export default WordViewer
