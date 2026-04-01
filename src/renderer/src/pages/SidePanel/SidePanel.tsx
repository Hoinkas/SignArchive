import { Dispatch, SetStateAction, useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import './SidePanel.css'
import { Word, WordWithCounts } from '@shared/types'
import ListOfWords from './ListOfWords/ListOfWords'
import ThemeSwitch from '@renderer/components/ThemeSwitch/ThemeSwitch'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import WordForm from '@renderer/components/Form/Forms/WordForm'

interface SidePanelProps {
  activeWord: Word | null
  setActiveWord: Dispatch<SetStateAction<Word | null>>
  wordsWithSignCount: WordWithCounts[]
  addWord: (word: Word) => void
}

function SidePanel(props: SidePanelProps): React.JSX.Element {
  const { activeWord, setActiveWord, wordsWithSignCount, addWord } = props
  const [searchWord, setSearchWord] = useState('')
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <div className="sidepanel">
      <ThemeSwitch />
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />

      <div
        style={{
          margin: '0px var(--space-8) var(--space-4) var(--space-8)',
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
            <WordForm setIsFormOpen={setIsFormOpen} setWordValues={addWord} formType="add" />
          </div>
        </div>
      )}
    </div>
  )
}

export default SidePanel
