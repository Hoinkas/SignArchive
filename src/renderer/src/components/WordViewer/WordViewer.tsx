import { useEffect, useState } from 'react'
import './WordViewer.css'
import { Word, WordWithDetails } from '@shared/types'
import MeaningBox from './MeaningBox/MeaningBox'
import WordTitle from './WordTitle/WordTitle'

interface WordViewerProps {
  word: Word
}

function WordViewer({ word }: WordViewerProps): React.JSX.Element {
  const [wordDetails, setWordDetails] = useState<WordWithDetails | null>(null)

  useEffect(() => {
    window.api.words.list_full(word.id).then(setWordDetails)
  }, [word.id])

  return (
    <div className="wordViewer">
      <WordTitle wordDetails={wordDetails} setWordDetails={setWordDetails} />

      <div className="meaningList">
        {wordDetails?.meanings.map((meaning, key) => (
          <MeaningBox key={key} meaningWithSigns={meaning} number={key}/>
        ))}
      </div>
    </div>
  )
}

export default WordViewer
