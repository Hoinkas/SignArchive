import { useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import './SidePanel.css'
import ListOfWords from './ListOfWords/ListOfWords'
import ThemeSwitch from '@renderer/components/ThemeSwitch/ThemeSwitch'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import WordForm from '@renderer/components/Form/Forms/WordForm'

function SidePanel(): React.JSX.Element {
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

      <ListOfWords searchWord={searchWord} />
      {isFormOpen && (
        <div className="formContainer">
          <div className="formBox">
            <WordForm setIsFormOpen={setIsFormOpen} formType="add" />
          </div>
        </div>
      )}
    </div>
  )
}

export default SidePanel
