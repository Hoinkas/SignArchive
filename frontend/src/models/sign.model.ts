import type { IBaseModelAttached } from './base.interface'
import { IMeaningDetails } from './meaning.model'
import type { IMediaAttached } from './media.model'

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
export interface ISignWithMedia extends Omit<ISign, 'mediaId'>, IBaseModelAttached {
  media: IMediaAttached
}

export interface ISignDetails extends ISignWithMedia {
  meanings: IMeaningDetails[]
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
