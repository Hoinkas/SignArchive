import { useState } from 'react'
import './WordTitle.css'
import { Word } from '@shared/types'
import WordTitleForm from '../../../components/Form/Forms/WordForm'
import KebabMenu from '@renderer/components/KebabMenu/KebabMenu'
import { useWord } from '@contexts/WordContext/useWord'
import PillList from '@renderer/components/PillList/PillList'
import { useTags } from '@contexts/TagsContext/useTags'
import { usePermissions } from '@contexts/PermissionsContext/usePermissions'

interface WordTitleProps {
  word: Word
}

function WordTitle({ word }: WordTitleProps): React.JSX.Element {
  const { isAdmin } = usePermissions()
  const { deleteWord } = useWord()
  const { tags } = useTags()
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="wordTitle">
      {isFormOpen ? (
        <WordTitleForm word={word} setIsFormOpen={setIsFormOpen} formType="edit" />
      ) : (
        <div>
          <div className="wordTitleWithButtons">
            <h1>{word.text}</h1>
            {isAdmin && <KebabMenu setIsFormOpen={setIsFormOpen} handleDelete={() => deleteWord()} />}
          </div>
          <div className="wordTitleDetails">
            <PillList textArray={tags.map((t) => t.name)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default WordTitle
