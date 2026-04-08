import type { ITag, ITagAttached } from '@src/models/tag.model'
import { createContext } from 'react'

export interface TagsContextValue {
  tags: (ITag | ITagAttached)[]
  addTag: (tag: ITag) => void
  deleteTag: (tag: ITag) => void
}

export const TagsContext = createContext<TagsContextValue>({
  tags: [],
  addTag: () => {},
  deleteTag: () => {}
})
