import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import './SidePanel.css'
import { Word, WordWithCounts } from '@shared/types'
import ListOfWords from './ListOfWords/ListOfWords'
import WordForm from '../WordForm/WordForm'
import ActionButton from '../ActionButton/ActionButton'

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

      <div
        style={{
          margin: '0px 32px 16px 32px',
          maxWidth: '240px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ActionButton text="Dodaj słowo" setIsFormOpen={setIsFormOpen} />
      </div>

      <ListOfWords
        searchWord={searchWord}
        activeWord={activeWord}
        setActiveWord={setActiveWord}
        wordsWithSignCount={wordsWithSignCount}
      />
      {isFormOpen && (
        <div className="formContainer">
          <div className="formBox">
            <WordForm setIsFormOpen={setIsFormOpen} setWordValues={setWordValues} formType="add" />
          </div>
        </div>
      )}
    </div>
  )
}

export default SidePanel
