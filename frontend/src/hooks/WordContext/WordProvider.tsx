import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { WordContext } from './WordContext'
import { wordApi } from '@src/services/word.api'
import { tagApi } from '@src/services/tag.api'
import type { ITagAttached } from '@src/models/tag.model'
import type { IWord, IWordAttached, IWordWithCountCategories } from '@src/models/word.model'

interface Props {
  children?: React.ReactNode
}

export default function WordProvider({ children }: Props): React.JSX.Element {
  const [allTags, setAllTags] = useState<ITagAttached[]>([])
  const [wordsList, setWordsList] = useState<IWordWithCountCategories[]>([])
  const [isDescending, setIsDescending] = useState<boolean>(false)
  const [activeWordId, setActiveWordId] = useState<string | null>(null)
  const [word, setWord] = useState<IWordAttached | null>(null)

  useEffect(() => {
    wordApi.list().then(setWordsList)
    tagApi.list().then(setAllTags)
  }, [])

  useEffect(() => {
    if (!activeWordId) return
    wordApi.details(activeWordId).then(setWord)
  }, [activeWordId])

  const addWord = (data: IWord, closeForm: () => void): void => {
    wordApi.create(data).then((result) => {
      setWordsList((prev) => [...prev, { ...result, signsCount: 0, categories: [], regions: [] }])
      closeForm()
    })
  }

  const editWord = (data: Partial<IWord>, closeForm: () => void): void => {
    if (!word) return
    wordApi.update(word.id, data).then((result) => {
      setWord(result)
      setWordsList((prev) => prev.map((w) => (w.id === result.id ? { ...w, ...result } : w)))
      closeForm()
    })
  }

  const deleteWord = (): void => {
    if (!word) return
    wordApi.delete(word.id).then(() => {
      setWordsList((prev) => prev.filter((w) => w.id !== word.id))
      setWord(null)
    })
  }

  const changeActiveWord = (wordId: string): void => setActiveWordId(wordId)

  const changeSignCountInWord = (action: 'add' | 'remove'): void => {
    if (!word) return
    const delta = action === 'add' ? 1 : -1
    setWordsList((prev) =>
      prev.map((w) => (w.id === word.id ? { ...w, signsCount: w.signsCount + delta } : w))
    )
  }

  const allWords = useMemo((): IWordWithCountCategories[] => {
    return [...wordsList].sort((a, b) => {
      const cmp = a.text.localeCompare(b.text, 'pl')
      return isDescending ? -cmp : cmp
    })
  }, [wordsList, isDescending])

  const toggleSort = (): void => setIsDescending((prev) => !prev)

  return (
    <WordContext.Provider
      value={{
        allTags,
        word,
        allWords,
        toggleSort,
        isDescending,
        addWord,
        editWord,
        deleteWord,
        activeWordId,
        changeActiveWord,
        changeSignCountInWord
      }}
    >
      {children}
    </WordContext.Provider>
  )
}
