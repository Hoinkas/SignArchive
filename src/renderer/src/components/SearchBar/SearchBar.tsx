import { useState } from 'react'
import './SearchBar.css'
import SearchIcon from '@renderer/assets/icons/SearchIcon'
import FilterIcon from '@renderer/assets/icons/FilterIcon'
import FormDropdown, { DropdownOption } from '../Form/Components/FormDropdown'
import { useSearch } from '@contexts/SearchCotext/useSearch'

function SearchBar(): React.JSX.Element {
  const {
    handleChange,
    handleNameChange,
    searchWord,
    categoriesOptions,
    categoryOption,
    regionsOptions,
    regionOption
  } = useSearch()
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  const handleFilterClick = (): void => {
    setIsFilterOpen(!isFilterOpen)

    if (!isFilterOpen) return
    handleChange('category', null)
    handleChange('region', null)
  }

  return ( //TODO Search as form for accesibility
    <div className="searchContainer">
      <div className="searchBar">
        <input
          type="search"
          placeholder="Wyszukaj znaki.."
          value={searchWord}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <div className="filterIcon" onClick={handleFilterClick}>
          <FilterIcon />
        </div>
        <div className="searchWrapper">
          <SearchIcon />
        </div>
      </div>
      {isFilterOpen && (
        <FormDropdown
          label="Kategorie"
          options={categoriesOptions}
          value={categoryOption}
          setValue={(value: DropdownOption | null) => handleChange('category', value)}
        />
      )}
      {isFilterOpen && (
        <FormDropdown
          label="Regiony"
          options={regionsOptions}
          value={regionOption}
          setValue={(value: DropdownOption | null) => handleChange('region', value)}
        />
      )}
    </div>
  )
}

export default SearchBar
