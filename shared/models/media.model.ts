import type { IBaseModelAttached } from './base.interface'

export interface IMedia {
  videoUrl: string
  mediaType: string
  thumbnailUrl?: string
  description?: string
}

export type IMediaAttached = IMedia & IBaseModelAttached

// TEMPLATES
export const mediaTemplate: Record<keyof IMedia, null> = {
  videoUrl: null,
  mediaType: null,
  thumbnailUrl: null,
  description: null
}
