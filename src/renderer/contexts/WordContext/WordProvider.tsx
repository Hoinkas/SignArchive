import { useEffect, useState } from 'react'
import React from 'react'
import { SignWithDetails, Word, WordWithCounts, WordWithSignsDetails } from '@shared/types'
import { WordContext } from './WordContext'

interface Props {
  children?: React.ReactNode
}

export default function WordProvider({ children }: Props): React.JSX.Element {
  const [activeWord, setActiveWord] = useState<Word | null>(null)
  const [wordDetails, setWordDetails] = useState<WordWithSignsDetails | null>(null)
  const [wordsList, setWordsList] = useState<WordWithCounts[]>([])

  useEffect(() => {
    window.api.word.listWithCount().then(setWordsList)
  }, [])

  useEffect(() => {
    if (!activeWord) return
    window.api.word.details(activeWord.id).then(setWordDetails)
  }, [activeWord, activeWord?.id])

  const addWord = (word: Word): void => {
    setWordsList((prevState) => [...prevState, { ...word, signsCount: 0 }])
  }

  const editWord = (word: Word): void => {
    if (!wordDetails) return
    setWordsList((prevState) =>
      prevState.map((w) =>
        w.id === word.id ? { ...word, signsCount: wordDetails.signs.length } : w
      )
    )
  }

  const deleteWord = (): void => {
    if (!activeWord) return
    window.api.word.delete(activeWord.id)
    setWordsList((prevState) => prevState.filter((w) => w.id !== activeWord.id))
    setActiveWord(null)
  }

  const changeActiveWord = (activeWord: Word): void => {
    setActiveWord(activeWord)
  }

  const setWordValues = (word: Word): void => {
    setWordDetails((prevState) => {
      if (!prevState) return null
      editWord({ ...prevState, ...word })
      return { ...prevState, ...word }
    })
  }

  const editSign = (sign: SignWithDetails): void => {
    setWordDetails((prevState) => {
      if (!prevState) return null

      const exists = prevState.signs.some((s) => s.id === sign.id)

      return {
        ...prevState,
        signs: exists
          ? prevState.signs.map((s) => (s.id === sign.id ? { ...s, ...sign } : s))
          : [...prevState.signs, sign]
      }
    })
  }

  const deleteSign = (deleteId: string): void => {
    window.api.sign.delete(deleteId).then(() => {
      setWordDetails((prevState) => {
        if (!prevState) return null
        return { ...prevState, signs: prevState.signs.filter((s) => s.id !== deleteId) }
      })
    })
  }

  return (
    <WordContext.Provider
      value={{
        activeWord,
        wordsList,
        addWord,
        editWord,
        deleteWord,
        changeActiveWord,
        wordDetails,
        setWordValues,
        editSign,
        deleteSign
      }}
    >
      {children}
    </WordContext.Provider>
  )
}
