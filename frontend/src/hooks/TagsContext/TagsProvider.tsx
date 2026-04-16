import { useEffect, useState } from 'react'
import React from 'react'
import { TagsContext } from './TagsContext'
import { tagApi } from '@src/services/tag.api'
import type { ITag, ITagAttached } from '@src/models/tag.model'

interface Props {
  wordId?: string
  children?: React.ReactNode
}

export default function TagsProvider({ wordId, children }: Props): React.JSX.Element {
  const [tags, setTags] = useState<(ITagAttached | ITag)[]>([])

  useEffect(() => {
    if (!wordId) return
    tagApi.listByWordId(wordId).then(setTags)
  }, [wordId])

  const addTag = (tag: ITag): void => {
    const duplicate = tags.find((t) => t.name === tag.name)
    if (!duplicate) setTags((prev) => [...prev, tag])
  }

  const deleteTag = (tag: ITag): void => {
    setTags((prev) => prev.filter((t) => t.name !== tag.name))
  }

  return (
    <TagsContext.Provider value={{ tags, addTag, deleteTag }}>
      {children}
    </TagsContext.Provider>
  )
}
