import './WordListDetails.css'
import { useSearch } from '@contexts/SearchCotext/useSearch'
import { wordsCountText } from '@src/functions/namesHelpers'
import SortAZIcon from '@src/assets/icons/SortAzIcon'
import SortZAIcon from '@src/assets/icons/SortZAIcon'
import { useWord } from '@contexts/WordContext/useWord'

function WordListDetails(): React.JSX.Element {
  const { isDescending, toggleSort } = useWord()
  const { filteredWords } = useSearch()

  return (
    <div className="wordListDetails additionalInfo">
      <p>{wordsCountText(filteredWords.length)}</p>
      <div onClick={toggleSort}>{isDescending ? <SortZAIcon /> : <SortAZIcon />}</div>
    </div>
  )
}

export default WordListDetails
