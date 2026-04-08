import type { IBaseModelAttached } from './base.interface'

export interface IAuthor {
  name: string
}

export type IAuthorAttached = IAuthor & IBaseModelAttached
