import { useState } from 'react'
import './SearchBar.css'
import { useSearch } from '@src/hooks/SearchContext/useSearch'

function SearchBar(): React.JSX.Element {
  const {
    handleNameChange,
    searchWord,
    handleClear
  } = useSearch()
  const [localWord, setLocalWord] = useState<string>(searchWord)

  const handleClearWithLocal = (): void => {
    setLocalWord('')
    handleClear()
  }

  return (
    <div className="searchContainer">
      <div className="searchBar">
        <input
          type="search"
          placeholder="Wyszukaj znaki.."
          value={localWord}
          onChange={(e) => {
            setLocalWord(e.target.value)
            handleNameChange(e.target.value)
          }}
        />
        <div className="clickableSymbolX" onClick={handleClearWithLocal}>×</div>
      </div>
    </div>
  )
}

export default SearchBar
