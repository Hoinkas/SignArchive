import { createContext } from 'react'
import type { DropdownOption } from '@src/components/Form/Components/FormDropdown'
import type { SearchOption } from './SearchProvider'

export interface SearchContextValue {
  searchWord: string
  filteredWords: string[]
  regionsOptions: DropdownOption[]
  regionOption: DropdownOption | null
  handleChange: (type: SearchOption, value: DropdownOption | null) => void
  handleNameChange: (value: string) => void
}

export const SearchContext = createContext<SearchContextValue>({
  searchWord: '',
  filteredWords: [],
  regionsOptions: [],
  regionOption: null,
  handleChange: () => {},
  handleNameChange: () => {}
})
