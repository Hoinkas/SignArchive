import { createContext } from 'react'
import type { Tag, TagToDB } from '@shared/types'

export interface TagsContextValue {
  tags: Tag[]
  addTag: (tag: TagToDB) => void
  deleteTag: (tag: Tag) => void
}

export const TagsContext = createContext<TagsContextValue>({
  tags: [],
  addTag: () => {},
  deleteTag: () => {}
})
