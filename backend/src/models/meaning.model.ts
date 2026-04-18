import type { IBaseModelAttached } from './base.interface'
import { ISourceAttached } from './source.model'

export interface IMeaning {
  explaination: string
  signId: number
}

export type IMeaningAttached = IMeaning & IBaseModelAttached

// TO BACKEND
export type IMeaningToDB = Omit<IMeaning, 'signId'>

// TO FRONTEND
export interface IMeaningDetails extends IMeaningAttached {
  sources: ISourceAttached[]
}

// TEMPLATES
export const meaningTemplate: Record<keyof IMeaning, null> = {
  explaination: null,
  signId: null
}

export const meaningToDbTemplate: Record<keyof IMeaningToDB, null> = {
  explaination: null
}
