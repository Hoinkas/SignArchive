import type { IBaseModelAttached } from './base.interface'
import type { IReferenceAttached } from './reference.model'
import type { IRegionToFE } from './region.model'

export interface ISource {
  referenceId: string
  notes?: string
  yearStart?: number
  yearEnd?: number
}

export type ISourceAttached = ISource & IBaseModelAttached

// TO FRONTEND
export interface ISourceToFE extends Omit<ISourceAttached, 'referenceId'> {
  regions: IRegionToFE[]
  reference: IReferenceAttached
}

// TEMPLATES
export const sourceTemplate: Record<keyof ISource, null> = {
  referenceId: null,
  notes: null,
  yearStart: null,
  yearEnd: null
}