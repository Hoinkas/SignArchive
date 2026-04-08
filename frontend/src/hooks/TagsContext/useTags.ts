import { useContext } from 'react'
import { TagsContext, type TagsContextValue } from './TagsContext'

export function useTags(): TagsContextValue {
  const context = useContext(TagsContext)
  if (!context) throw new Error('useTags must be used within <TagsProvider/>')
  return context
}
