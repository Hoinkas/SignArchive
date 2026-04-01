import { createContext } from 'react'
import { SignWithDetails, Word, WordWithCounts, WordWithSignsDetails } from '@shared/types'

export interface WordContextValue {
  activeWord: Word | null
  wordsList: WordWithCounts[]
  addWord: (word: Word) => void
  editWord: (word: Word) => void
  deleteWord: () => void
  changeActiveWord: (activeWord: Word) => void
  wordDetails: WordWithSignsDetails | null
  setWordValues: (word: Word) => void
  editSign: (sign: SignWithDetails) => void
  deleteSign: (deleteId: string) => void
}

export const WordContext = createContext<WordContextValue>({
  activeWord: null,
  wordsList: [],
  addWord: () => {},
  editWord: () => {},
  deleteWord: () => {},
  changeActiveWord: () => {},
  wordDetails: null,
  setWordValues: () => {},
  editSign: () => {},
  deleteSign: () => {}
})
