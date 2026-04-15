import { useSearch } from '@src/hooks/SearchCotext/useSearch'
import './WordsList.css'
import { useWord } from '@src/hooks/WordContext/useWord'
import { signCountText } from '@src/utils/namesHelpers'
import type { IWordWithRegionsCategories } from '@src/models/word.model'
import { useNavigate } from 'react-router-dom'

function WordsList(): React.JSX.Element {
  const { filteredWords } = useSearch()
  const { activeWordId, changeActiveWord } = useWord()
  const navigate = useNavigate()

  function handleWordClick(word: IWordWithRegionsCategories) {
    changeActiveWord(word.id)
    navigate(`/word/${word.text}`)
  }

  return (
    <ul className="wordsList">
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

export default WordsList
