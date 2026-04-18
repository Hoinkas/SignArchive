import type { IBaseModelAttached } from './base.interface'

export type ReferenceType = 'book' | 'url' | 'personal'

export interface IReference {
  name: string
  fullName: string
  type: ReferenceType
  url?: string
  notes?: string
}

export type IReferenceAttached = IReference & IBaseModelAttached
