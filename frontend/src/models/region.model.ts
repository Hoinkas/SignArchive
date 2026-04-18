import type { IBaseModelAttached } from './base.interface'

export interface IRegion {
  name: string
}

export type IRegionAttached = IRegion & IBaseModelAttached
