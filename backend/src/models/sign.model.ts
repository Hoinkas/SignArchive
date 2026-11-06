import type { IBaseModelAttached } from './base.interface'
import type { IMeaningDetailed } from './meaning.model'
import type { IMediaAttached } from './media.model'
import type { IRegionToFE } from './region.model'
import { IWordAttached } from './word.model'
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
  words: IWordAttached[]
  media: IMediaAttached[]
}

export interface ISignDetailed extends ISignAttached {
  meanings: IMeaningDetailed[]
  media: IMediaAttached[]
}

// TEMPLATES
export const signTemplate: Record<keyof ISign, null> = {
  uniqueNumber: null,
  notes: null
}