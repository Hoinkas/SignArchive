import './WordItem.css'
import { WordWithCount } from '@shared/types'
import { signCountText } from '@renderer/functions/namesHelpers'
import { useWord } from '@contexts/WordContext/useWord'

interface WordProps {
  word: WordWithCount
}

function WordItem(props: WordProps): React.JSX.Element {
  const { word } = props
  const { activeWordId, changeActiveWord } = useWord()

  const isActive = word.id === activeWordId
  const className = isActive ? 'word active' : 'word'

  return (
    <li className={className} onClick={() => changeActiveWord(word.id)}>
      <div>{word.text}</div>
      <div className="additionalInfo">{signCountText(word.signsCount)}</div>
    </li>
  )
}

export default WordItem
