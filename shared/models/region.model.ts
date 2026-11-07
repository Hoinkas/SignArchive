import type { IBaseModelAttached } from './base.interface'
import type { IWordAttached } from './word.model'

export interface IRegion {
  name: string
  regionParentId: string
}

export type IRegionAttached = IRegion & IBaseModelAttached

// TO FRONTEND
export interface IRegionToFE extends Omit<IRegionAttached, 'regionParentId'> {
  parentName?: string
}

// TEMPLATES
export const regionTemplate: Record<keyof IRegion, null> = {
  name: null,
  regionParentId: null
}
