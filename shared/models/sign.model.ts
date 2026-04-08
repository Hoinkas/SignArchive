import type { IBaseModelAttached } from './base.interface'
import type { IDefinition, IDefinitionAttached } from './definition.model'
import type { IMedia, IMediaAttached } from './media.model'
import type { IYearStartEnd } from './yearStartEnd.model'

export interface ISign {
  mediaId: string
  notes?: string
}

export type ISignAttached = ISign & IBaseModelAttached

export interface ISignDetails extends ISign, IBaseModelAttached, IYearStartEnd {
  sourcesCount: number
  definitions: IDefinitionAttached[]
  regions: string[]
  media: IMediaAttached
}

export interface ISignDetailsToDB {
  wordId: string
  definition: IDefinition
  media: IMedia
  notes?: string
}
