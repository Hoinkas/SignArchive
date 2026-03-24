import { useCallback, useEffect, useState } from 'react'
import './WordViewer.css'
import { SignWithSourceSignerMediaFile, Word, WordWithDetails } from '@shared/types'
import MeaningBox from './MeaningBox/MeaningBox'
import WordTitle from './WordTitle/WordTitle'
import ComparsionBox from './ComparsionBox/ComparsionBox'

interface WordViewerProps {
  word: Word
}

function WordViewer({ word }: WordViewerProps): React.JSX.Element {
  const [wordDetails, setWordDetails] = useState<WordWithDetails | null>(null)
  const [isComparsionActive, setIsComparsionActive] = useState<boolean>(false)
  const [activeSigns, setActiveSigns] = useState<SignWithSourceSignerMediaFile[]>([])

  const downloadWordDetails = useCallback((): void => {
    window.api.words.list_full(word.id).then(setWordDetails)
  }, [word.id])

  useEffect(() => {
    downloadWordDetails()
  }, [downloadWordDetails])

  const handleCloseComparsionWindow = (): void => {
    setActiveSigns([])
    setIsComparsionActive(false)
    downloadWordDetails()
  }

  return (
    <div className="wordViewer">
      <WordTitle
        wordDetails={wordDetails}
        setWordDetails={setWordDetails}
        setIsComparsionActive={setIsComparsionActive}
      />

      <div className="meaningList">
        {wordDetails?.meanings.map((meaning, key) => (
          <MeaningBox
            key={key}
            meaningWithSigns={meaning}
            number={key}
            isComparsionActive={isComparsionActive}
            activeSigns={activeSigns}
            setActiveSigns={setActiveSigns}
          />
        ))}

        {isComparsionActive && (
        <ComparsionBox
          activeSigns={activeSigns}
          handleCloseComparsionWindow={handleCloseComparsionWindow}
        />
      )}
      </div>


    </div>
  )
}

export default WordViewer
