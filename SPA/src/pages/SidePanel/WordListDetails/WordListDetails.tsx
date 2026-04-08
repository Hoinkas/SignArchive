import './WordListDetails.css'
import { useSearch } from '@contexts/SearchCotext/useSearch'
import { wordsCountText } from '@renderer/functions/namesHelpers'
import SortAZIcon from '@renderer/assets/icons/SortAzIcon'
import SortZAIcon from '@renderer/assets/icons/SortZAIcon'
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
