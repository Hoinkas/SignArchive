import { useState } from 'react'
import './WordTitle.css'
import WordTitleForm from '@src/components/Form/Forms/WordForm'
import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import { useWord } from '@src/hooks/WordContext/useWord'
import PillList from '@src/components/PillList/PillList'
import { useTags } from '@src/hooks/TagsContext/useTags'
import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import type { IWordAttached } from '@src/models/word.model'
import { useNavigate } from 'react-router-dom'

interface WordTitleProps {
  word: IWordAttached
}

function WordTitle({ word }: WordTitleProps): React.JSX.Element {
  const { isAdmin } = usePermissions()
  const { deleteWord } = useWord()
  const { tags } = useTags()
  const navigate = useNavigate()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isHovering, setIsHovering] = useState<boolean>(false);

  function handleDelete() {
    navigate(`/`)
    deleteWord()
  }

  return (
    <div className="wordTitle" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
      {isFormOpen ? (
        <WordTitleForm word={word} setIsFormOpen={setIsFormOpen} formType="edit" />
      ) : (
        <div>
          <div className="wordTitleWithButtons">
            <h1>{word.text}</h1>
            {isAdmin && <KebabMenu setIsFormOpen={setIsFormOpen} handleDelete={handleDelete} isHovering={isHovering} />}
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
