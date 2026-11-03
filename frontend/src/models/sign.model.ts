import type { IBaseModelAttached } from './base.interface'
import type { IMeaningAttached } from './meaning.model'
import type { IMediaAttached } from './media.model'
import type { IReferenceAttached } from './reference.model'
import type { IRegionToFE } from './region.model'
import type { ISourceAttached } from './source.model'
import type { IWordAttached } from './word.model'
import type { IYearStartEnd } from './yearStartEnd.model'

export interface ISign {
  uniqueNumber: string
  notes?: string
}

export type ISignAttached = ISign & IBaseModelAttached

// TO FRONTEND
export interface ISignSimple extends ISignAttached {
  regions: IRegionToFE[]
  years: IYearStartEnd
  words: string[]
  media: IMediaAttached[]
}

export interface ISignDetailed extends ISignAttached {
  regions: IRegionToFE[]
  words: IWordAttached[]
  meanings: IMeaningAttached[]
  sources: ISourceAttached[]
  references: IReferenceAttached[]
  media: IMediaAttached[]
}

// TEMPLATES
export const signTemplate: Record<keyof ISign, null> = {
  uniqueNumber: null,
  notes: null
}