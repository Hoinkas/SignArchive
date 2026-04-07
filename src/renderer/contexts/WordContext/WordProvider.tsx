import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { WordToDB, WordWithCountCategories, Word, Tag } from '@shared/types'
import { WordContext } from './WordContext'

interface Props {
  children?: React.ReactNode
}

export default function WordProvider({ children }: Props): React.JSX.Element {
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [wordsList, setWordsList] = useState<WordWithCountCategories[]>([])
  const [isDescending, setIsDescending] = useState<boolean>(false)
  const [activeWordId, setActiveWordId] = useState<string | null>(null)
  const [word, setWord] = useState<Word | null>(null)

  useEffect(() => {
    window.api.word.listWithCount().then(setWordsList)
    window.api.tag.list().then(setAllTags)
  }, [])

  useEffect(() => {
    if (!activeWordId) return
    window.api.word.details(activeWordId).then(setWord)
  }, [activeWordId])

  const addWord = (word: WordToDB, closeForm: () => void): void => {
    window.api.word.create(word).then((result) => {
      setWordsList((prevState) => [
        ...prevState,
        { ...result, signsCount: 0, categories: [], regions: [] }
      ])
      closeForm()
    })
  }

  const editWord = (updateWord: Partial<WordToDB>, closeForm: () => void): void => {
    if (!word) return

    window.api.word.update(word.id, updateWord).then((result) => {
      if (!result) return
      setWord(result)
      setWordsList((prevState) =>
        prevState.map((w) => (w.id === result.id ? { ...w, ...result } : w))
      )
      closeForm()
    })
  }

  const deleteWord = (): void => {
    if (!word) return
    window.api.word.delete(word.id).then(() => {
      setWordsList((prevState) => prevState.filter((w) => w.id !== word.id))
      setWord(null)
    })
  }

  const changeActiveWord = (wordId: string): void => {
    setActiveWordId(wordId)
  }

  const changeSignCountInWord = (action: 'add' | 'remove'): void => {
    if (!word) return
    const numberAction = action === 'add' ? 1 : -1
    setWordsList((prevState) =>
      prevState.map((w) =>
        w.id === word.id ? { ...w, signsCount: w.signsCount + numberAction } : w
      )
    )
  }

  const allWords = useMemo((): WordWithCountCategories[] => {
    return [...wordsList].sort((a, b) => {
      const comparison = a.text.localeCompare(b.text, 'pl')
      return isDescending ? -comparison : comparison
    })
  }, [wordsList, isDescending])

  const toggleSort = (): void => {
    setIsDescending((prev) => !prev)
  }

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
