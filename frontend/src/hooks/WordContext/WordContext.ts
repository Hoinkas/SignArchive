import type { ITagAttached } from '@src/models/tag.model'
import type { IWord, IWordAttached, IWordWithCountCategories } from '@src/models/word.model'
import { createContext } from 'react'

export interface WordContextValue {
  allTags: ITagAttached[]
  word: IWordAttached | null
  allWords: IWordWithCountCategories[]
  toggleSort: () => void
  isDescending: boolean
  addWord: (word: IWord, closeForm: () => void) => void
  editWord: (word: Partial<IWord>, closeForm: () => void) => void
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
