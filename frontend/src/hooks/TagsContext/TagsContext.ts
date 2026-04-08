import { createContext } from 'react'
import type { Tag, ITag } from '@shared/types'

export interface TagsContextValue {
  tags: ITagAttached[]
  addTag: (tag: ITag) => void
  deleteTag: (tag: Tag) => void
}

export const TagsContext = createContext<TagsContextValue>({
  tags: [],
  addTag: () => {},
  deleteTag: () => {}
})
