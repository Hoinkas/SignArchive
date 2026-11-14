import { useState } from 'react'
import './SearchBar.css'
import { useSearch } from '@src/hooks/SearchContext/useSearch'
import SearchIcon from '@src/assets/icons/SearchIcon'

function SearchBar(): React.JSX.Element {
  const {
    handleNameChange,
    searchWord,
  } = useSearch()
  const [localWord, setLocalWord] = useState<string>(searchWord)

  return (
    <div className="searchContainer">
      <div className="searchBar">
        <div className='searchIcon'><SearchIcon/></div>
        <input
          type="search"
          placeholder="Wyszukaj znaki..."
          value={localWord}
          onChange={(e) => {
            setLocalWord(e.target.value)
          }}
        />
      </div>
      <button onClick={() => handleNameChange(localWord)}>
        Szukaj
      </button>
    </div>
  )
}

export default SearchBar
