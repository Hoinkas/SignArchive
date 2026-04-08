import { useState } from 'react'
import './WordTitle.css'
import type { Word } from '@shared/types'
import WordTitleForm from '../../../components/Form/Forms/WordForm'
import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import { useWord } from '@src/hooks/WordContext/useWord'
import PillList from '@src/components/PillList/PillList'
import { useTags } from '@src/hooks/TagsContext/useTags'
import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'

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
