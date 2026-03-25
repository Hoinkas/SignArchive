import { Dispatch, SetStateAction } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  searchWord: string
  setSearchWord: Dispatch<SetStateAction<string>>
}

function SearchBar(props: SearchBarProps): React.JSX.Element {
  const { searchWord, setSearchWord } = props

  const handleNameChange = (event): void => {
    setSearchWord(event.target.value)
  }

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Wyszukaj znaki.."
        value={searchWord}
        onChange={(e) => handleNameChange(e)}
      />
    </div>
  )
}

export default SearchBar
