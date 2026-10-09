import type { IBaseModelAttached } from './base.interface'

export interface IRegion {
  name: string
  regionParentId: string
}

export type IRegionAttached = IRegion & IBaseModelAttached

// TO FRONTEND
export interface IRegionToFE extends Omit<IRegion, 'regionParentId'>, IBaseModelAttached {
  parentName: string
}


// TEMPLATES
export const regionTemplate: Record<keyof IRegion, null> = {
  name: null,
  regionParentId: null
}
