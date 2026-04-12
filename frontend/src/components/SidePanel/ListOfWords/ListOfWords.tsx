import { useSearch } from '@src/hooks/SearchCotext/useSearch'
import './ListOfWords.css'
import { useWord } from '@src/hooks/WordContext/useWord'
import { signCountText } from '@src/utils/namesHelpers'
import type { IWordWithRegionsCategories } from '@src/models/word.model'
import { useNavigate } from 'react-router-dom'
import { WORD_FRAGMENT } from '@src/utils/baseUrl.helper'

function ListOfWords(): React.JSX.Element {
  const { filteredWords } = useSearch()
  const { activeWordId, changeActiveWord } = useWord()
  const navigate = useNavigate()

  function handleWordClick(word: IWordWithRegionsCategories) {
    changeActiveWord(word.id)
    navigate(`${WORD_FRAGMENT}/${word.text}`)
  }

  return (
    <ul className="listOfWords">
      {filteredWords.map((word: IWordWithRegionsCategories, key: number) => (
        <li
          key={key}
          className={word.id === activeWordId ? 'word active' : 'word'}
          onClick={() => handleWordClick(word)}
        >
          <div>{word.text}</div>
          <div className="additionalInfo">{signCountText(word.signsCount)}</div>
        </li>
      ))}
    </ul>
  )
}

export default ListOfWords
