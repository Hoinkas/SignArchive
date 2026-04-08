import type { IBaseModelAttached } from './base.interface'
import { ITagAttached } from './tag.model'

export interface IWord {
  text: string
}

export interface IWordToDB extends IWord {
  tagIds?: string[]
}

export type IWordAttached = IWord & IBaseModelAttached

export interface IWordWithCount extends IWord {
  signsCount: number
}

export interface IWordWithCountCategories extends IWordWithCount, IBaseModelAttached {
  categories: ITagAttached[]
  regions: string[]
}
