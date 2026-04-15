import { useSearch } from '@src/hooks/SearchCotext/useSearch'
import './WordsList.css'
import { useWord } from '@src/hooks/WordContext/useWord'
import { signCountText } from '@src/utils/namesHelpers'
import type { IWordWithRegionsCategories } from '@src/models/word.model'
import { useNavigate } from 'react-router-dom'

function WordsList(): React.JSX.Element {
  const { filteredWords } = useSearch()
  const { word } = useWord()
  const navigate = useNavigate()

  function handleWordClick(w: IWordWithRegionsCategories) {
    navigate(`/word/${w.text}`)
  }

  return (
    <ul className="wordsList">
      {filteredWords.map((w: IWordWithRegionsCategories, key: number) => (
        <li
          key={key}
          className={word && w.id === word.id ? 'word active' : 'word'}
          onClick={() => handleWordClick(w)}
        >
          <div>{w.text}</div>
          <div className="additionalInfo">{signCountText(w.signsCount)}</div>
        </li>
      ))}
    </ul>
  )
}

export default WordsList
