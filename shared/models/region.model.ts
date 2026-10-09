import type { IBaseModelAttached } from './base.interface'

export interface IRegion {
  name: string
  regionParentId: string
}

export type IRegionAttached = IRegion & IBaseModelAttached

// TEMPLATES
export const regionTemplate: Record<keyof IRegion, null> = {
  name: null,
  regionParentId: null
}
