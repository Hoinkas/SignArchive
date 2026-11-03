import type { IBaseModelAttached } from './base.interface'

export interface IMedia {
  signId: string
  videoUrl: string
  thumbnailUrl: string
  description?: string
}

export type IMediaAttached = IMedia & IBaseModelAttached

// TEMPLATES
export const mediaTemplate: Record<keyof IMedia, null> = {
  signId: null,
  videoUrl: null,
  thumbnailUrl: null,
  description: null
}