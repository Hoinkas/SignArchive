import type { IBaseModelAttached } from './base.interface'

export interface IRegion {
  name: string
}

export type IRegionAttached = IRegion & IBaseModelAttached

// TEMPLATES
export const regionTemplate: Record<keyof IRegion, null> = {
  name: null
}
