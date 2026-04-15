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
  setActiveWordByName: (word: string) => string | null
  changeSignCountInWord: (action: 'add' | 'remove') => void
  wordListLoading: boolean
  wordLoading: boolean
  error: string | null
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
  setActiveWordByName: () => null,
  changeSignCountInWord: () => {},
  wordListLoading: true,
  wordLoading: false,
  error: ''
})
