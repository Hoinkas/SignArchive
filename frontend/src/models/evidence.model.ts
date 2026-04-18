import type { IBaseModelAttached } from './base.interface'

export type ReferenceType = 'książka' | 'url' | 'osobiste'

export interface IReference {
  name: string
  fullName: string
  type: ReferenceType
  url?: string
}

export type IReferenceAttached = IReference & IBaseModelAttached
