import { createContext } from 'react'
import type { WordWithCountCategories } from '@shared/types'
import type { DropdownOption } from '@src/components/Form/Components/FormDropdown'

export interface SearchContextValue {
  searchWord: string
  filteredWords: WordWithCountCategories[]
  categoriesOptions: DropdownOption[]
  categoryOption: DropdownOption | null
  regionsOptions: DropdownOption[]
  regionOption: DropdownOption | null
  handleChange: (type: 'category' | 'region', value: DropdownOption | null) => void
  handleNameChange: (value: string) => void
}

export const SearchContext = createContext<SearchContextValue>({
  searchWord: '',
  filteredWords: [],
  categoriesOptions: [],
  categoryOption: null,
  regionsOptions: [],
  regionOption: null,
  handleChange: () => {},
  handleNameChange: () => {}
})
