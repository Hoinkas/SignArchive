import { createContext } from 'react'
import type { SearchOption } from './SearchProvider'

export interface SearchContextValue {
  searchWord: string
  filteredWords: string[]
  regionList: string[]
  region: string
  handleOptionChange: (type: SearchOption, value: string) => void
  handleNameChange: (value: string) => void
  yearStart: string
  yearEnd: string
  handleYearChange: (yearType: 'yearStart' | 'yearEnd', year: string) => void
  handleClear: () => void
}

export const SearchContext = createContext<SearchContextValue>({
  searchWord: '',
  filteredWords: [],
  regionList: [],
  region: '',
  handleOptionChange: () => {},
  handleNameChange: () => {},
  yearStart: '',
  yearEnd: '',
  handleYearChange: () => {},
  handleClear: () => {}
})
