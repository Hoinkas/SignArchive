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

function WordDetails(): React.JSX.Element {
  const { isAdmin } = usePermissions()
  const { word } = useWord()
  const { initiateSigns } = useSigns()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!word) return
    initiateSigns(word.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word?.id])

  if (!word) return <div>Error</div>

  return (
    <div className="wordDetails">
      <TagsProvider wordId={word.id}>
        <WordTitle word={word} />
      </TagsProvider>
      <SourcesProvider>
        <SignList />
      </SourcesProvider>
      {isAdmin ? (
        isFormOpen ? (
          <AddSignForm formType="add" setIsFormOpen={setIsFormOpen} />
        ) : (
          <ActionButton setIsFormOpen={setIsFormOpen} text={'Dodaj znak'} isAtEnd={true} />
        )
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default WordDetails
