import { useEffect, useState } from 'react'
import React from 'react'
import { Tag, TagToDB } from '@shared/types'
import { useWord } from '@contexts/WordContext/useWord'
import { TagsContext } from './TagsContext'

interface Props {
  wordId?: string
  children?: React.ReactNode
}

export default function TagsProvider({ wordId, children }: Props): React.JSX.Element {
  const { allTags } = useWord()
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    if (!wordId) return

    window.api.tag.listByWordId(wordId).then(setTags)
  }, [wordId])

  const addTag = (tag: TagToDB): void => {
    if (!wordId) {
      const exists = allTags.find((t) => t.name === tag.name)
      if (exists && !tags.find((t) => t.id === exists.id)) {
        setTags((prev) => [...prev, exists])
      }
      return
    }

    const exists = allTags.find((t) => t.name === tag.name)
    if (exists) {
      window.api.tag.addToWord(wordId, exists.id).then(() => setTags((prev) => [...prev, exists]))
      return
    }
    window.api.tag.create(wordId, tag).then((result) => setTags((prev) => [...prev, result]))
  }

  const deleteTag = (tag: Tag): void => {
    if (!wordId) {
      setTags((prev) => prev.filter((t) => t.id !== tag.id))
      return
    }
    window.api.tag
      .removeFromWord(tag.id, wordId)
      .then(() => setTags((prev) => prev.filter((t) => t.id !== tag.id)))
  }

  return (
    <TagsContext.Provider
      value={{
        tags,
        addTag,
        deleteTag
      }}
    >
      {children}
    </TagsContext.Provider>
  )
}
