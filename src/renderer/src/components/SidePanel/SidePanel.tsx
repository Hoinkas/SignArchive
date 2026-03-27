import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import './SidePanel.css'
import { Word, WordWithCounts } from '@shared/types'
import ListOfWords from './ListOfWords/ListOfWords'
import AddWordButton from './AddWordButton/AddWordButton'
import WordForm from '../WordTitleForm/WordForm'

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

  return (
    <div className="sidepanel">
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <AddWordButton setIsFormOpen={setIsFormOpen} />
      <ListOfWords
        searchWord={searchWord}
        activeWord={activeWord}
        setActiveWord={setActiveWord}
        wordsWithSignCount={wordsWithSignCount}
      />
      {isFormOpen && (
        <div className="wordFormContainer">
          <div className="wordForm">
            <WordForm setIsFormOpen={setIsFormOpen} setWordsWithSignCount={setWordsWithSignCount}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default SidePanel
