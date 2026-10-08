import type { IBaseModelAttached } from './base.interface'
import { IMediaAttached } from './media.model'
import { IYearStartEnd } from './yearStartEnd.model'

export interface ISign {
  uniqueNumber: string
  notes?: string
}

export type ISignAttached = ISign & IBaseModelAttached

// TO FRONTEND
export interface ISignSimple extends Omit<ISign, 'mediaId'>, IBaseModelAttached {
  regions: string[]
  years: IYearStartEnd
  words: string[]
  media: IMediaAttached[]
}

// TEMPLATES
export const signTemplate: Record<keyof ISign, null> = {
  uniqueNumber: null,
  notes: null
}
