import type { IBaseModelAttached } from './base.interface'
import type { IMeaningDetails } from './meaning.model'
import type { IMediaAttached, IMediaToDB } from './media.model'
import type { IYearStartEnd } from './yearStartEnd.model'

export interface ISign {
  mediaId: string
  notes?: string
}

export type ISignAttached = ISign & IBaseModelAttached

// TO BACKEND
export type ISignDetailsToDB = Omit<ISign, 'mediaId'>

// TO FRONTEND
export interface ISignSimple extends Omit<ISign, 'mediaId'>, IBaseModelAttached {
  meaningsCount: number
  regions: string[]
  years: IYearStartEnd
  words: string[]
  media: IMediaAttached
}

export interface ISignDetails extends Omit<ISign, 'mediaId'>, IBaseModelAttached {
  meanings: IMeaningDetails[]
  media: IMediaAttached
}

// TEMPLATES
export const signTemplate: Record<keyof ISign, null> = {
  mediaId: null,
  notes: null
}
