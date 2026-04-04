import { createContext } from 'react'
import { Tag, TagToDB } from '@shared/types'

export interface TagsContextValue {
  allTags: Tag[]
  tags: Tag[]
  addTag: (tag: TagToDB) => void
  deleteTag: (tag: Tag) => void
}

export const TagsContext = createContext<TagsContextValue>({
  allTags: [],
  tags: [],
  addTag: () => {},
  deleteTag: () => {}
})
