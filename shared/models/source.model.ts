import type { IBaseModelAttached } from './base.interface'
import { IReference, IReferenceAttached } from './reference.model'
import { IRegion, IRegionAttached } from './region.model'

export interface ISource {
  referenceId: string
  context: string
  yearStart: number
  yearEnd?: number
}

export type ISourceAttached = ISource & IBaseModelAttached

// TO BACKEND
export type ISourceToDB = Omit<ISource, 'referenceId'>

export interface ISourceWithDetailsToDB {
  source: ISourceToDB
  reference: IReference
  regions: IRegion[]
}

// TO FRONTEND
export interface ISourceDetails extends Omit<ISource, 'referenceId'>, IBaseModelAttached {
  reference: IReferenceAttached
  regions: IRegionAttached[]
}

// TEMPLATES
export const sourceTemplate: Record<keyof ISource, null> = {
  referenceId: null,
  context: null,
  yearStart: null,
  yearEnd: null
}
