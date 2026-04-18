import type { IBaseModelAttached } from './base.interface'
import { IMeaningAttached } from './meaning.model'
import type { IMediaAttached } from './media.model'
import type { IYearStartEnd } from './yearStartEnd.model'

export interface ISign {
  mediaId: string
  notes?: string
}

export type ISignAttached = ISign & IBaseModelAttached

export interface ISignDetails extends ISign, IBaseModelAttached, IYearStartEnd {
  media: IMediaAttached
  meanings: IMeaningAttached[]
}

export interface ISignDetailsToDB {
  media: IMediaAttached
  notes?: string
}
