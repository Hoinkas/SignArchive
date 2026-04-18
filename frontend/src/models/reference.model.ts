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

// TEMPLATES
export const referenceTemplate: Record<keyof IReference, null> = {
  name: null,
  fullName: null,
  type: null,
  url: null,
  notes: null
}
