import { useEffect, useState } from 'react'
import { Word, WordWithCounts, WordWithSignsDetails } from '@shared/types'
import WordViewer from './pages/WordViewer/WordViewer'
import SidePanel from './pages/SidePanel/SidePanel'

function App(): React.JSX.Element {
  const [activeWord, setActiveWord] = useState<Word | null>(null)
  const [wordsWithSignCount, setWordsWithSignCount] = useState<WordWithCounts[]>([])

  useEffect(() => {
    window.api.word.listWithCount().then(setWordsWithSignCount)
  }, [])

  const addWord = (word: Word): void => {
    setWordsWithSignCount((prevState) => [...prevState, { ...word, signsCount: 0 }])
  }

  const editWord = (word: WordWithSignsDetails): void => {
    console.log(word, word.signs.length)
    setWordsWithSignCount((prevState) =>
      prevState.map((w) => (w.id === word.id ? { ...word, signsCount: word.signs.length } : w))
    )
  }

  return (
    <div style={{ display: 'flex' }}>
      <SidePanel
        activeWord={activeWord}
        setActiveWord={setActiveWord}
        wordsWithSignCount={wordsWithSignCount}
        addWord={addWord}
      />
      {activeWord && <WordViewer word={activeWord} editWord={editWord} />}
    </div>
  )
}

export default App
