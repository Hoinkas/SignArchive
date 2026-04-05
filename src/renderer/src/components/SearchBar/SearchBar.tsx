import { Dispatch, SetStateAction } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  searchWord: string
  setSearchWord: Dispatch<SetStateAction<string>>
}

function SearchBar(props: SearchBarProps): React.JSX.Element {
  const { searchWord, setSearchWord } = props

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchWord(e.target.value.replaceAll('\u00A0', '').trimEnd())
  }

  return ( //TODO Search as form for accesibility
    <div className="searchBar">
      <input
        type="search"
        placeholder="Wyszukaj znaki.."
        value={searchWord}
        onChange={handleNameChange}
      />
      <div className="searchWrapper">
        <div className="searchIcon" />
      </div>
    </div>
  )
}

export default SearchBar
