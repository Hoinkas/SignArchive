import { Dispatch, SetStateAction } from 'react'
import './WordItem.css'
import { Word, WordWithCounts } from '@shared/types'
import { signCountText } from '@renderer/functions/namesVersionsHelpers'

interface WordProps {
  word: WordWithCounts
  isActive: boolean
  setActiveWord: Dispatch<SetStateAction<Word | null>>
}

function WordItem(props: WordProps): React.JSX.Element {
  const { word, isActive, setActiveWord } = props
  const className = isActive ? 'word active' : 'word'

  return (
    <li className={className} onClick={() => setActiveWord(word)}>
      <div>{word.text}</div>
      <div className="additionalInfo">{signCountText(word.signsCount)}</div>
    </li>
  )
}

export default WordItem
