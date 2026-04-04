import { useState } from 'react'
import './WordTitle.css'
import { WordWithTags } from '@shared/types'
import WordTitleForm from '../../../components/Form/Forms/WordForm'
import KebabMenu from '@renderer/components/KebabMenu/KebabMenu'
import { useWord } from '@contexts/WordContext/useWord'
import PillList from '@renderer/components/PillList/PillList'

interface WordTitleProps {
  word: WordWithTags
}

function WordTitle({ word }: WordTitleProps): React.JSX.Element {
  const { deleteWord } = useWord()
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="wordTitle">
      {isFormOpen ? (
        <WordTitleForm word={word} setIsFormOpen={setIsFormOpen} formType="edit" />
      ) : (
        <div>
          <div className="wordTitleWithButtons">
            <h1>{word.text}</h1>
            <KebabMenu setIsFormOpen={setIsFormOpen} handleDelete={() => deleteWord()} />
          </div>
          <div className="wordTitleDetails">
            <PillList textArray={word.tags.map((t) => t.name)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default WordTitle
