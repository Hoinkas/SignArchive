import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import './SearchBar.css'
import SearchIcon from '@renderer/assets/icons/SearchIcon'
import FilterIcon from '@renderer/assets/icons/FilterIcon'
import FormDropdown, { DropdownOption } from '../Form/Components/FormDropdown'

interface SearchBarProps {
  searchWord: string
  setSearchWord: Dispatch<SetStateAction<string>>
  tagOption: DropdownOption | null
  setTagOption: Dispatch<SetStateAction<DropdownOption | null>>
}

function SearchBar(props: SearchBarProps): React.JSX.Element {
  const { searchWord, setSearchWord, tagOption, setTagOption } = props

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [tagsOptions, setTagsOptions] = useState<DropdownOption[]>([])

  useEffect(() => {
    window.api.tag.list().then((result) =>
      setTagsOptions(
        result.map((t) => {
          return { id: t.id, label: t.name }
        })
      )
    )
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchWord(e.target.value.replaceAll('\u00A0', '').trimEnd())
  }

  const handleFilterClick = (): void => {
    if (isFilterOpen) setTagOption(null)
    setIsFilterOpen(!isFilterOpen)
  }

  return ( //TODO Search as form for accesibility
    <div>
      <div className="searchBar">
        <input
          type="search"
          placeholder="Wyszukaj znaki.."
          value={searchWord}
          onChange={handleNameChange}
        />
        <div className="filterIcon" onClick={handleFilterClick}>
          <FilterIcon />
        </div>
        <div className="searchWrapper">
          <SearchIcon />
        </div>
      </div>
      {isFilterOpen && (
        <FormDropdown label="" options={tagsOptions} value={tagOption} setValue={setTagOption} />
      )}
    </div>
  )
}

export default SearchBar
