import { useEffect, useState } from 'react'
import './WordViewer.css'
import WordTitle from './WordTitle/WordTitle'
import SignList from './SignList/SignList'
import AddSignForm from '@renderer/components/Form/Forms/AddSignForm'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import { useWord } from '@contexts/WordContext/useWord'
import { useSigns } from '@contexts/SignsContext/useSigns'
import SourcesProvider from '@contexts/SourcesContext/SourcesProvider'
import TagsProvider from '@contexts/TagsContext/TagsProvider'
import { usePermissions } from '@contexts/PermissionsContext/usePermissions'

function WordViewer(): React.JSX.Element {
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
    <div className="wordViewer">
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

export default WordViewer
