import type { IBaseModelAttached } from './base.interface'

export interface IMedia {
  videoUrl: string
  mediaType: string
  thumbnailUrl?: string
  description?: string
}

export type IMediaAttached = IMedia & IBaseModelAttached
