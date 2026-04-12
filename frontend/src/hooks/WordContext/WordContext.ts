import type { ITag, ITagAttached } from '@src/models/tag.model'
import type { IWord, IWordAttached, IWordWithRegionsCategories } from '@src/models/word.model'
import { createContext } from 'react'

export interface WordContextValue {
  allTags: ITagAttached[]
  word: IWordAttached | null
  allWords: IWordWithRegionsCategories[]
  toggleSort: () => void
  isDescending: boolean
  addWord: (word: IWord, tags: (ITag | ITagAttached)[], closeForm: () => void) => void
  editWord: (word: Partial<IWord>, tags: (ITag | ITagAttached)[], closeForm: () => void) => void
  deleteWord: () => void
  activeWordId: string | null
  changeActiveWord: (wordId: string) => void
  setActiveWordByName: (word: string) => boolean
  changeSignCountInWord: (action: 'add' | 'remove') => void
  loading: boolean
  error: string
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
  setActiveWordByName: () => false,
  changeSignCountInWord: () => {},
  loading: false,
  error: ''
})
