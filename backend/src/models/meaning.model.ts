import type { IBaseModelAttached } from './base.interface'
import { ISourceDetails } from './source.model'
import { IWordAttached } from './word.model'

export interface IMeaning {
  explaination: string
  signId: string
}

export type IMeaningAttached = IMeaning & IBaseModelAttached

// TO BACKEND
export type IMeaningToDB = Omit<IMeaning, 'signId'>

// TO FRONTEND
export interface IMeaningDetails extends Omit<IMeaning, 'signId'>, IBaseModelAttached {
  sources: ISourceDetails[]
  words: IWordAttached[]
}

// TEMPLATES
export const meaningTemplate: Record<keyof IMeaning, null> = {
  explaination: null,
  signId: null
}

export const meaningToDbTemplate: Record<keyof IMeaningToDB, null> = {
  explaination: null
}
