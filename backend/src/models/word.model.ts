import type { IBaseModelAttached } from './base.interface'
import type { ITag, ITagAttached } from './tag.model'

export interface IWord {
  text: string
}

export interface IWord extends IWord {
  categories: (ITag | ITagAttached)[]
}

export type IWordAttached = IWord & IBaseModelAttached

export interface IWordAttached extends IWord, IBaseModelAttached {
  categories: ITagAttached[]
}
export interface IWordWithCount extends IWord {
  signsCount: number
}

export type IWordWithCountAttached = IWordWithCount & IBaseModelAttached

export interface IWordWithRegions extends IWordWithCount, IBaseModelAttached {
  categories: ITagAttached[]
  regions: string[]
}
