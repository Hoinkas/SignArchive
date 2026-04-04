import { useEffect, useState } from 'react'
import React from 'react'
import { Tag, TagToDB } from '@shared/types'
import { useWord } from '@contexts/WordContext/useWord'
import { TagsContext } from './TagsContext'

interface Props {
  children?: React.ReactNode
}

export default function TagsProvider({ children }: Props): React.JSX.Element {
  const { word } = useWord()
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    window.api.tag.list().then(setAllTags)
  }, [])

  useEffect(() => {
    if (!word?.id) return

    window.api.tag.listByWordId(word.id).then(setTags)
  }, [word?.id])

  const addTag = (tag: TagToDB): void => {
    if (!word) return
    const exists = allTags.find((t) => t.name === tag.name)

    if (exists) {
      setTags((prevState) => [...prevState, exists])
      return
    }

    window.api.tag
      .create(word.id, tag)
      .then((result) => setTags((prevState) => [...prevState, result]))
  }

  const deleteTag = (tag: Tag): void => {
    window.api.tag
      .delete(tag.id)
      .then(() => setTags((prevState) => prevState.filter((t) => t.id !== tag.id)))
  }

  return (
    <TagsContext.Provider
      value={{
        tags,
        allTags,
        addTag,
        deleteTag
      }}
    >
      {children}
    </TagsContext.Provider>
  )
}
