import type { IBaseModelAttached } from './base.interface'
import { IWordAttached } from './word.model'
import { ISourceToFE } from '@signarchive/shared/models/source.model'

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