import type { IBaseModelAttached } from './base.interface'
import { ISourceAttached } from './source.model'

export interface IMeaning {
  explaination: string
  wordId: string
  signId: number
}

export type IMeaningToDB = Omit<IMeaning, 'wordId' | 'signId'>
export type IMeaningAttached = IMeaning & IBaseModelAttached

export interface IMeaningDetails extends IMeaningAttached {
  sources: ISourceAttached[]
}
