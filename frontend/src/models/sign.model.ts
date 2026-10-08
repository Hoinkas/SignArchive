import type { IBaseModelAttached } from './base.interface'
import type { IMediaAttached } from './media.model'
import type { IYearStartEnd } from './yearStartEnd.model'

export interface ISign {
  uniqueNumber: number
  notes?: string
}

export type ISignAttached = ISign & IBaseModelAttached

// TO FRONTEND
export interface ISignSimple extends ISign, IBaseModelAttached {
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
