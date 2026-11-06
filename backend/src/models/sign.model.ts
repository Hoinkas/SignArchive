import { IRegionToFE } from '@signarchive/shared/models/region.model'
import type { IBaseModelAttached } from './base.interface'
import type { IMediaAttached } from './media.model'
import type { IYearStartEnd } from './yearStartEnd.model'
import { IWordAttached } from '@signarchive/shared/models/word.model'
import { IMeaningDetailed } from '@signarchive/shared/models/meaning.model'

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