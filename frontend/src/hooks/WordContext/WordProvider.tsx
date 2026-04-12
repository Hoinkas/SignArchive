import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { WordContext } from './WordContext'
import { wordApi } from '@src/services/word.api'
import { tagApi } from '@src/services/tag.api'
import type { ITag, ITagAttached } from '@src/models/tag.model'
import type { IWord, IWordAttached, IWordWithRegionsCategories } from '@src/models/word.model'

interface Props {
  children?: React.ReactNode
}

export default function WordProvider({ children }: Props): React.JSX.Element {
  const [allTags, setAllTags] = useState<ITagAttached[]>([])
  const [wordsList, setWordsList] = useState<IWordWithRegionsCategories[]>([])
  const [isDescending, setIsDescending] = useState<boolean>(false)
  const [activeWordId, setActiveWordId] = useState<string | null>(null)
  const [word, setWord] = useState<IWordAttached | null>(null)

  useEffect(() => {
    wordApi.list().then(setWordsList)
    tagApi.list().then(setAllTags)
  }, [])

  useEffect(() => {
  if (!activeWordId) return

  let cancelled = false

  wordApi.details(activeWordId).then((result) => {
    if (!cancelled) setWord(result)
  })

  return () => {
    cancelled = true
  }
}, [activeWordId])

  const addWord = (data: IWord, tags: (ITag | ITagAttached)[], closeForm: () => void): void => {
    wordApi.create({...data, categories: tags}).then((result) => {
      setWordsList((prev) => [...prev, { ...result, signsCount: 0, regions: [] }])
      closeForm()
    })
  }

  const editWord = (data: Partial<IWord>, tags: (ITag | ITagAttached)[], closeForm: () => void): void => {
    if (!word) return
    wordApi.update(word.id, {...data, categories: tags}).then((result) => {
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

  const changeActiveWord = (wordId: string): void => {
    setActiveWordId(wordId)
  }

  const setActiveWordByName = (word: string): boolean => {
    const find = wordsList.find((w) => w.text === word)

    if (!find) return false

    setActiveWordId(find.id)
    return true
  }

  const changeSignCountInWord = (action: 'add' | 'remove'): void => {
    if (!word) return
    const delta = action === 'add' ? 1 : -1
    setWordsList((prev) =>
      prev.map((w) => (w.id === word.id ? { ...w, signsCount: w.signsCount + delta } : w))
    )
  }

  const allWords = useMemo((): IWordWithRegionsCategories[] => {
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
        setActiveWordByName,
        changeSignCountInWord
      }}
    >
      {children}
    </WordContext.Provider>
  )
}
