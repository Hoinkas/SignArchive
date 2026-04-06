import { createContext } from 'react'
import { WordWithCountCategories } from '@shared/types'
import { DropdownOption } from '@renderer/components/Form/Components/FormDropdown'

export interface SearchContextValue {
  filteredWords: WordWithCountCategories[]
  categoriesOptions: DropdownOption[]
  categoryOption: DropdownOption | null
  regionsOptions: DropdownOption[]
  regionOption: DropdownOption | null
  handleChange: (type: 'category' | 'region', value: DropdownOption | null) => void
  handleNameChange: (value: string) => void
}

export const SearchContext = createContext<SearchContextValue>({
  filteredWords: [],
  categoriesOptions: [],
  categoryOption: null,
  regionsOptions: [],
  regionOption: null,
  handleChange: () => {},
  handleNameChange: () => {}
})
