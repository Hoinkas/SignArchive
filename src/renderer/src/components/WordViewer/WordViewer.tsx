import { useEffect, useState } from 'react'
import './WordViewer.css'
import { Word, WordWithMeaningsDetails } from '@shared/types'
import MeaningBox from './MeaningBox/MeaningBox'
import WordTitle from './WordTitle/WordTitle'

interface WordViewerProps {
  word: Word
}

function WordViewer({ word }: WordViewerProps): React.JSX.Element {
  const [wordDetails, setWordDetails] = useState<WordWithMeaningsDetails | null>(null)

  useEffect(() => {
    window.api.word.details(word.id).then(setWordDetails)
  }, [word.id])

  if (!wordDetails || !setWordDetails) return <div>ERROR</div>

  return (
    <div className="wordViewer">
      <WordTitle wordDetails={wordDetails} setWordDetails={setWordDetails} />

      <div className="meaningList">
        {wordDetails.meanings.map((meaning, key) => (
          <MeaningBox key={key} meaningWithSigns={meaning} number={key} />
        ))}
      </div>
    </div>
  )
}

export default WordViewer
