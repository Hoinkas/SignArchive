import { createContext } from 'react'
import { Word, WordToDB, WordWithCounts, WordWithSignsDetails } from '@shared/types'

export interface WordContextValue {
  word: WordWithSignsDetails | null
  wordsList: WordWithCounts[]
  addWord: (word: WordToDB, closeForm: () => void) => void
  editWord: (word: Word, closeForm: () => void) => void
  deleteWord: () => void
  activeWordId: string | null
  changeActiveWord: (wordId: string) => void
}

export const WordContext = createContext<WordContextValue>({
  word: null,
  wordsList: [],
  addWord: () => {},
  editWord: () => {},
  deleteWord: () => {},
  activeWordId: null,
  changeActiveWord: () => {}
})
