import type { IBaseModelAttached } from './base.interface'

export interface IWord {
  name: string
}

export type IWordAttached = IWord & IBaseModelAttached
