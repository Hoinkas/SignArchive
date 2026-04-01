import './WordItem.css'
import { WordWithCounts } from '@shared/types'
import { signCountText } from '@renderer/functions/namesVersionsHelpers'
import { useWord } from '@contexts/WordContext/useWord'

interface WordProps {
  word: WordWithCounts
}

function WordItem(props: WordProps): React.JSX.Element {
  const { word } = props
  const { activeWord, changeActiveWord } = useWord()

  const isActive = word.id === activeWord?.id
  const className = isActive ? 'word active' : 'word'

  return (
    <li className={className} onClick={() => changeActiveWord(word)}>
      <div>{word.text}</div>
      <div className="additionalInfo">{signCountText(word.signsCount)}</div>
    </li>
  )
}

export default WordItem
