import type { IBaseModelAttached } from './base.interface'
import { ISourceToFE } from './source.model'
import { IWordAttached } from './word.model'

export interface IMeaning {
  explanation: string
  signId: string
}

export type IMeaningAttached = IMeaning & IBaseModelAttached

export interface IMeaningDetailed extends Omit<IMeaningAttached, 'signId'>{
  words: IWordAttached[]
  sources: ISourceToFE[]
}

// TEMPLATES
export const meaningTemplate: Record<keyof IMeaning, null> = {
  explanation: null,
  signId: null
}