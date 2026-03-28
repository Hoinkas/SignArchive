import { Dispatch, SetStateAction } from 'react'
import './WordItem.css'
import { Word, WordWithCounts } from '@shared/types'

interface WordProps {
  word: WordWithCounts
  isActive: boolean
  setActiveWord: Dispatch<SetStateAction<Word | null>>
}

function returnSignWord(count: number): string {
  if (count === 1) return 'znak'
  if ([0, 1, 5, 6, 7, 8, 9].includes(count % 10)) return 'znaków'
  if ([2, 3, 4].includes(count % 10)) return 'znaki'
  return 'znaków'
}

function returnMeaningWord(count: number): string {
  if (count === 1) return 'znaczenie'
  if ([0, 1, 5, 6, 7, 8, 9].includes(count % 10)) return 'znaczeń'
  if ([2, 3, 4].includes(count % 10)) return 'znaczenia'
  return 'znaczeń'
}

function WordItem(props: WordProps): React.JSX.Element {
  const { word, isActive, setActiveWord } = props
  const className = isActive ? 'word active' : 'word'
  const meaningsCountText = word.meaningsCount + ' ' + returnMeaningWord(word.meaningsCount)
  const signsCountText = word.signsCount + ' ' + returnSignWord(word.signsCount)

  return (
    <li className={className} onClick={() => setActiveWord(word)}>
      <div>{word.text}</div>
      <div className="additionalInfoText">
        {meaningsCountText} - {signsCountText}
      </div>
    </li>
  )
}

export default WordItem
