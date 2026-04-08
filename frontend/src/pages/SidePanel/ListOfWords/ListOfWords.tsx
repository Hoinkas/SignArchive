import { useSearch } from '@src/hooks/SearchCotext/useSearch'
import './ListOfWords.css'
import { useWord } from '@src/hooks/WordContext/useWord'
import { signCountText } from '@src/utils/namesHelpers'
import type { IWordWithCountCategories } from '@src/models/word.model'

function ListOfWords(): React.JSX.Element {
  const { filteredWords } = useSearch()
  const { activeWordId, changeActiveWord } = useWord()

  return (
    <ul className="listOfWords">
      {filteredWords.map((word: IWordWithCountCategories, key: number) => (
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
