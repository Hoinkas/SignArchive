import type { IBaseModelAttached } from './base.interface'
import { IMeaningAttached } from './meaning.model'
import type { IMediaAttached } from './media.model'
import type { IYearStartEnd } from './yearStartEnd.model'

export interface ISign {
  mediaId: string
  notes?: string
}

export type ISignAttached = ISign & IBaseModelAttached

// TO BACKEND
export interface ISignDetailsToDB {
  media: IMediaAttached
  notes?: string
}

// TO FRONTEND
export interface ISignDetails extends ISign, IBaseModelAttached, IYearStartEnd {
  media: IMediaAttached
  meanings: IMeaningAttached[]
}

// TEMPLATES
export const signTemplate: Record<keyof ISign, null> = {
  mediaId: null,
  notes: null
}

export const signDetailsToDBTemplate: Record<keyof ISignDetailsToDB, null> = {
  media: null,
  notes: null
}
