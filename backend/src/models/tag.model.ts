import type { IBaseModelAttached } from './base.interface'

export interface ITag {
  name: string
}

export interface ITagWord {
  tagId: string
  wordId: string
}

export type TagDropdownOption = Omit<ITagAttached, 'createdAt'>
export type ITagAttached = ITag & IBaseModelAttached
