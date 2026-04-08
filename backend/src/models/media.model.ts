import type { IBaseModelAttached } from './base.interface'

export interface IMedia {
  name?: string
  url: string
  mediaType: string
}

export type IMediaAttached = IMedia & IBaseModelAttached
