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
  const [word, setWord] = useState<IWordAttached | null>(null)
  const [wordListLoading, setWordListLoading] = useState<boolean>(true)
  const [wordLoading, setWordLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      wordApi.list().then(setWordsList),
      tagApi.list().then(setAllTags)
    ])
      .catch((err) => setError(err.message ?? 'Błąd ładowania'))
      .finally(() => setWordListLoading(false))
  }, [])

  const addWord = (data: IWord, tags: (ITag | ITagAttached)[], closeForm: () => void): void => {
    wordApi.create({...data, categories: tags}).then((result) => {
      setWordsList((prev) => [...prev, { ...result, signsCount: 0, regions: [] }])
      closeForm()
    })
  }

  const editWord = (data: Partial<IWord>, tags: (ITag | ITagAttached)[], closeForm: () => void): void => {
    if (!word) return
    setWordLoading(true)

    wordApi.update(word.id, {...data, categories: tags}).then((result) => {
      setWord(result)
      setWordsList((prev) => prev.map((w) => (w.id === result.id ? { ...w, ...result } : w)))
      closeForm()
      setWordLoading(false)
    })
  }

  const deleteWord = (): void => {
    if (!word) return
    wordApi.delete(word.id).then(() => {
      setWordsList((prev) => prev.filter((w) => w.id !== word.id))
      setWord(null)
    })
  }

  const setActiveWordByName = (wordName: string) => {
    const find = wordsList.find((w) => w.text === wordName)
    if (!find) {
      setError('Brak takiego słowa')
      return null
    }

    setWord(null)
    setWordLoading(true)

    wordApi.details(find.id).then((result) => {
      setWord(result)
      setWordLoading(false)
    })

    return find.id
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
        setActiveWordByName,
        changeSignCountInWord,
        wordListLoading,
        error,
        wordLoading
      }}
    >
      {children}
    </WordContext.Provider>
  )
}
