import { createContext } from 'react'
import type { DropdownOption } from '@src/components/Form/Components/FormDropdown'
import type { SearchOption } from './SearchProvider'

export interface SearchContextValue {
  searchWord: string
  filteredWords: string[]
  regionsOptions: DropdownOption[]
  regionOption: DropdownOption | null
  handleOptionChange: (type: SearchOption, value: DropdownOption | null) => void
  handleNameChange: (value: string) => void
  yearStart: string
  yearEnd: string
  handleYearChange: (yearType: 'yearStart' | 'yearEnd', year: string) => void
}

export const SearchContext = createContext<SearchContextValue>({
  searchWord: '',
  filteredWords: [],
  regionsOptions: [],
  regionOption: null,
  handleOptionChange: () => {},
  handleNameChange: () => {},
  yearStart: '',
  yearEnd: '',
  handleYearChange: () => {}
})
