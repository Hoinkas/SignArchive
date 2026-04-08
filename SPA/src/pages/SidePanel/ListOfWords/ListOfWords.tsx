import { useSearch } from '@contexts/SearchCotext/useSearch'
import './ListOfWords.css'
import { useWord } from '@contexts/WordContext/useWord'
import { signCountText } from '@renderer/functions/namesHelpers'
import type { WordWithCountCategories } from '@shared/types'

function ListOfWords(): React.JSX.Element {
  const { filteredWords } = useSearch()
  const { activeWordId, changeActiveWord } = useWord()

  return (
    <ul className="listOfWords">
      {filteredWords.map((word: WordWithCountCategories, key: number) => (
        <li
          key={key}
          className={word.id === activeWordId ? 'word active' : 'word'}
          onClick={() => changeActiveWord(word.id)}
        >
          <div>{word.text}</div>
          <div className="additionalInfo">{signCountText(word.signsCount)}</div>
        </li>
      ))}
    </ul>
  )
}

export default ListOfWords
