import { useContext } from 'react'
import { SearchContext, SearchContextValue } from './SearchContext'

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearch must be used within <SearchProvider/>')
  return context
}
