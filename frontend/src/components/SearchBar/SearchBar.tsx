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

  const handleFilterClick = (): void => {
    setIsFilterOpen(!isFilterOpen)
    if (!isFilterOpen) return
  }

  const regionsOptions = regionList.map((r, key) => {return {id: key.toString(), label: r}}) as DropdownOption[]

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
        <div className="clickableSymbolX" onClick={() => handleClear()}>×</div>
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </div>
      {isFilterOpen && (
        <>
          <FormDropdown
            key={region}
            label="Regiony"
            options={regionsOptions}
            value={regionsOptions.find((r) => r.label === region) ?? null}
            setValue={(value: DropdownOption | null) => handleOptionChange('region', value?.label ?? '')}
          />
          <FormTwoInLineWrapper>
            <FormSingleLineInput label="Rok początkowy" value={yearStart} setValue={(value: string) => handleYearChange('yearStart', value)} type='number' />
            <FormSingleLineInput label="Rok końcowy" value={yearEnd} setValue={(value: string) => handleYearChange('yearEnd', value)} type='number' />
          </FormTwoInLineWrapper>
        </>
      )}
    </div>
  )
}

export default SearchBar
