import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import './SidePanel.css'
import { Word, WordWithCounts } from '@shared/types'
import ListOfWords from './ListOfWords/ListOfWords'
import AddButton from '../AddButton/AddButton'
import WordForm from '../WordForm/WordForm'

interface SidePanelProps {
  activeWord: Word | null
  setActiveWord: Dispatch<SetStateAction<Word | null>>
}

function SidePanel(props: SidePanelProps): React.JSX.Element {
  const { activeWord, setActiveWord } = props
  const [searchWord, setSearchWord] = useState('')
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [wordsWithSignCount, setWordsWithSignCount] = useState<WordWithCounts[]>([])

  useEffect(() => {
    window.api.word.listWithCount().then((result) => {
      setWordsWithSignCount(result.sort((a, b) => b.signCount - a.signCount))
    })
  }, [])

  const setWordValues = (word: Word): void => {
    setWordsWithSignCount((prevState) => [
      ...prevState,
      { ...word, meaningsCount: 0, signsCount: 0 }
    ])
  }

  return (
    <div className="sidepanel">
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <AddButton formVariant="word" setIsFormOpen={setIsFormOpen} />
      <ListOfWords
        searchWord={searchWord}
        activeWord={activeWord}
        setActiveWord={setActiveWord}
        wordsWithSignCount={wordsWithSignCount}
      />
      {isFormOpen && (
        <div className="wordFormContainer">
          <div className="wordForm">
            <WordForm setIsFormOpen={setIsFormOpen} setWordValues={setWordValues} formType="add" />
          </div>
        </div>
      )}
    </div>
  )
}

export default SidePanel
