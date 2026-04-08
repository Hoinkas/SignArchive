import { useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import './SidePanel.css'
import ListOfWords from './ListOfWords/ListOfWords'
import ThemeSwitch from '@src/components/ThemeSwitch/ThemeSwitch'
import ActionButton from '@src/components/ActionButton/ActionButton'
import WordForm from '@src/components/Form/Forms/WordForm'
import WordListDetails from './WordListDetails/WordListDetails'
import TagsProvider from '@contexts/TagsContext/TagsProvider'
import { usePermissions } from '@contexts/PermissionsContext/usePermissions'

function SidePanel(): React.JSX.Element {
  const { isAdmin } = usePermissions()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <div className="sidepanel">
      {isAdmin && <ThemeSwitch />}
      <SearchBar />

      {isAdmin &&
        <div
          style={{
            margin: '0px var(--space-8) var(--space-4) var(--space-8)',
            maxWidth: '240px',
            display: 'flex',
            justifyContent: 'center'
          }} //TODO move to to css
        >
          <ActionButton text="Dodaj słowo" setIsFormOpen={setIsFormOpen} />
        </div>
      }
      <WordListDetails />
      <ListOfWords />
      {isFormOpen && ( //TODO wrap with form Wrapper
        <div className="formContainer">
          <div className="formBox">
            <TagsProvider>
              <WordForm setIsFormOpen={setIsFormOpen} formType="add" />
            </TagsProvider>
          </div>
        </div>
      )}
    </div>
  )
}

export default SidePanel
