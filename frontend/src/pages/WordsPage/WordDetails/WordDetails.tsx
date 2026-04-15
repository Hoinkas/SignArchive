import { useEffect, useState } from 'react'
import './WordDetails.css'
import SignList from '../SignList/SignList'
import AddSignForm from '@src/components/Form/Forms/AddSignForm'
import ActionButton from '@src/components/ActionButton/ActionButton'
import { useWord } from '@src/hooks/WordContext/useWord'
import { useSigns } from '@src/hooks/SignsContext/useSigns'
import SourcesProvider from '@src/hooks/SourcesContext/SourcesProvider'
import TagsProvider from '@src/hooks/TagsContext/TagsProvider'
import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import WordTitle from './WordTitle/WordTitle'
import Loader from '@src/components/Loader/Loader'

function WordDetails(): React.JSX.Element {
  const { isAdmin } = usePermissions()
  const { word, loading } = useWord()
  const { initiateSigns } = useSigns()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!word) return
    initiateSigns(word.id)
  }, [initiateSigns, word, word?.id])

  if (loading || !word) return <div className="wordDetails"><Loader/></div>

  return (
    <div className="wordDetails">
      <TagsProvider wordId={word.id}>
        <WordTitle word={word} />
      </TagsProvider>
      <SourcesProvider>
        <SignList />
      </SourcesProvider>
      {isAdmin && (
        isFormOpen ? (
          <AddSignForm formType="add" setIsFormOpen={setIsFormOpen} />
        ) : (
          <ActionButton setIsFormOpen={setIsFormOpen} text={'Dodaj znak'} isAtEnd />
        )
      )}
    </div>
  )
}

export default WordDetails
