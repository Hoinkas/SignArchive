import { createContext } from 'react'
import { Tag, WordToDB, WordWithCount, WordWithTags } from '@shared/types'

export interface WordContextValue {
  word: WordWithTags | null
  wordsList: WordWithCount[]
  addWord: (word: WordToDB, closeForm: () => void) => void
  editWord: (word: Partial<WordToDB>, closeForm: () => void) => void
  deleteWord: () => void
  activeWordId: string | null
  changeActiveWord: (wordId: string) => void
  changeSignCountInWord: (action: 'add' | 'remove') => void
  allTags: Tag[]
  addTag: (tag: string) => Tag | undefined
}

export const WordContext = createContext<WordContextValue>({
  word: null,
  wordsList: [],
  addWord: () => {},
  editWord: () => {},
  deleteWord: () => {},
  activeWordId: null,
  changeActiveWord: () => {},
  changeSignCountInWord: () => {},
  allTags: [],
  addTag: () => undefined
})
