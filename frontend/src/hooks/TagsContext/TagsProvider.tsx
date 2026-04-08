import { useEffect, useState } from 'react'
import React from 'react'
import { useWord } from '@src/hooks/WordContext/useWord'
import { TagsContext } from './TagsContext'
import { tagApi } from '@src/services/tag.api'
import type { ITag, ITagAttached } from '@src/models/tag.model'

interface Props {
  wordId?: string
  children?: React.ReactNode
}

export default function TagsProvider({ wordId, children }: Props): React.JSX.Element {
  const { allTags } = useWord()
  const [tags, setTags] = useState<(ITagAttached | ITag)[]>([])

  useEffect(() => {
    if (!wordId) return
    tagApi.listByWordId(wordId).then(setTags)
  }, [wordId])

  const addTag = (tag: ITag): void => {
    const exists = allTags.find((t) => t.name === tag.name)
    const isDuplicate = tags.find((t) => t.name === tag.name)

    if (!exists && !isDuplicate) setTags((prev) => [...prev, exists || tag])
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
