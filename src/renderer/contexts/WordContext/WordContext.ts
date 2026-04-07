import { createContext } from 'react'
import { WordToDB, WordWithCountCategories, Word, Tag } from '@shared/types'

export interface WordContextValue {
  allTags: Tag[]
  word: Word | null
  allWords: WordWithCountCategories[]
  toggleSort: () => void
  isDescending: boolean
  addWord: (word: WordToDB, closeForm: () => void) => void
  editWord: (word: Partial<WordToDB>, closeForm: () => void) => void
  deleteWord: () => void
  activeWordId: string | null
  changeActiveWord: (wordId: string) => void
  changeSignCountInWord: (action: 'add' | 'remove') => void
}

export const WordContext = createContext<WordContextValue>({
  allTags: [],
  word: null,
  allWords: [],
  toggleSort: () => {},
  isDescending: false,
  addWord: () => {},
  editWord: () => {},
  deleteWord: () => {},
  activeWordId: null,
  changeActiveWord: () => {},
  changeSignCountInWord: () => {}
})
