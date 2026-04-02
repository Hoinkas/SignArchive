import { useEffect, useState } from 'react'
import React from 'react'
import { Word, WordToDB, WordWithCounts, WordWithSignsDetails } from '@shared/types'
import { WordContext } from './WordContext'

interface Props {
  children?: React.ReactNode
}

export default function WordProvider({ children }: Props): React.JSX.Element {
  const [wordsList, setWordsList] = useState<WordWithCounts[]>([])
  const [activeWordId, setActiveWordId] = useState<string | null>(null)
  const [word, setWord] = useState<WordWithSignsDetails | null>(null)

  useEffect(() => {
    window.api.word.listWithCount().then(setWordsList)
  }, [])

  useEffect(() => {
    if (!activeWordId) return
    window.api.word.details(activeWordId).then(setWord)
  }, [activeWordId])

  const addWord = (word: WordToDB, closeForm: () => void): void => {
    window.api.word.create(word).then((result) => {
      setWordsList((prevState) => [...prevState, { ...result, signsCount: 0 }])
      closeForm()
    })
  }

  const editWord = (word: Word, closeForm: () => void): void => {
    const newWord: WordToDB = { text: word.text, tags: word.tags }
    window.api.word.update(word.id, newWord).then((result) => {
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

  return (
    <WordContext.Provider
      value={{
        word,
        wordsList,
        addWord,
        editWord,
        deleteWord,
        activeWordId,
        changeActiveWord
      }}
    >
      {children}
    </WordContext.Provider>
  )
}
