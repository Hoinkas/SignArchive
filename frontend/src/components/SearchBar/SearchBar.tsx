import { useState } from 'react'
import './SearchBar.css'
import SearchIcon from '@src/assets/icons/SearchIcon'
import FilterIcon from '@src/assets/icons/FilterIcon'
import FormDropdown, { type DropdownOption } from '../Form/Components/FormDropdown'
import { useSearch } from '@src/hooks/SearchContext/useSearch'
import { FormSingleLineInput, FormTwoInLineWrapper } from '../Form/Form'

function SearchBar(): React.JSX.Element {
  const {
    handleOptionChange,
    handleNameChange,
    searchWord,
    regionList,
    yearStart,
    yearEnd,
    region,
    handleYearChange,
    handleClear
  } = useSearch()
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [localWord, setLocalWord] = useState<string>(searchWord)

  const handleFilterClick = (): void => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleClearWithLocal = (): void => {
    setLocalWord('')
    handleClear()
  }

  const regionsOptions = regionList.map((r, key) => ({ id: key.toString(), label: r })) as DropdownOption[]

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
        <div className="filterIcon" onClick={handleFilterClick}>
          <FilterIcon />
        </div>
        <div className="clickableSymbolX" onClick={handleClearWithLocal}>×</div>
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </div>
      {isFilterOpen && (
        <FormTwoInLineWrapper>
          <FormDropdown
            key={region}
            label="Regiony"
            options={regionsOptions}
            value={regionsOptions.find((r) => r.label === region) ?? null}
            setValue={(value: DropdownOption | null) => handleOptionChange('region', value?.label ?? '')}
          />
          <FormSingleLineInput label="Rok początkowy" value={yearStart} setValue={(value: string) => handleYearChange('yearStart', value)} type='number' />
          <FormSingleLineInput label="Rok końcowy" value={yearEnd} setValue={(value: string) => handleYearChange('yearEnd', value)} type='number' />
        </FormTwoInLineWrapper>
      )}
    </div>
  )
}

export default SearchBar
