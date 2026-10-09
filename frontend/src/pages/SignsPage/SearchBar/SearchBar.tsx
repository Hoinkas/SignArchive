import { useState } from 'react'
import './SearchBar.css'
import SearchIcon from '@src/assets/icons/SearchIcon'

function SearchBar(): React.JSX.Element {
//   const {
//     handleOptionChange,
//     handleNameChange,
//     searchWord,
//     regionList,
//     yearStart,
//     yearEnd,
//     region,
//     handleYearChange,
//   } = useSearch()
  const [localWord, setLocalWord] = useState<string>('')

//   const regionsOptions = regionList.map((r, key) => ({ id: key.toString(), label: r })) as DropdownOption[]

  return (
    <div className="searchContainer">
      <div className="searchBar">
        <input
          type="search"
          placeholder="Wyszukaj znaki.."
          value={localWord}
          onChange={(e) => {
            setLocalWord(e.target.value)
            // handleNameChange(e.target.value)
          }}
        />
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </div>
      {/* <FormTwoInLineWrapper>
        <FormDropdown
        key={region}
        label="Regiony"
        options={regionsOptions}
        value={regionsOptions.find((r) => r.label === region) ?? null}
        setValue={(value: DropdownOption | null) => handleOptionChange('region', value?.label ?? '')}
        />
        <FormSingleLineInput label="Rok początkowy" value={yearStart} setValue={(value: string) => handleYearChange('yearStart', value)} type='number' />
        <FormSingleLineInput label="Rok końcowy" value={yearEnd} setValue={(value: string) => handleYearChange('yearEnd', value)} type='number' />
    </FormTwoInLineWrapper> */}
    </div>
  )
}

export default SearchBar
