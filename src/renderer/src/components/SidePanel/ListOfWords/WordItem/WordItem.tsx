import { Dispatch, SetStateAction } from 'react'
import './WordItem.css'
import { Word, WordWithSignCount } from '@shared/types'

interface WordProps {
  word: WordWithSignCount
  isActive: boolean
  setActiveWord: Dispatch<SetStateAction<Word | null>>
}

function returnWord(count: number): string {
  if (count === 1) return 'znak'
  if ([0, 1, 5, 6, 7, 8, 9].includes(count % 10)) return 'znaków'
  if ([2, 3, 4].includes(count % 10)) return 'znaki'
  return 'znaków'
}

function WordItem(props: WordProps): React.JSX.Element {
  const { word, isActive, setActiveWord } = props
  const className = isActive ? 'word active' : 'word'
  const signCountText = word.signCount + ' ' + returnWord(word.signCount)

  return (
    <li className={className} onClick={() => setActiveWord(word)}>
      <div>{word.text}</div>
      <div style={{fontSize: '12px', color: 'grey'}}>{signCountText}</div>
    </li>
  )
}

export default WordItem
