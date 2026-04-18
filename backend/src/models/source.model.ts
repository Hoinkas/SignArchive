import type { IBaseModelAttached } from './base.interface'
import { IReference, IReferenceAttached } from './reference'
import { IRegion, IRegionAttached } from './region.model'

export interface ISource {
  referenceId: string
  context: string
  yearStart: number
  yearEnd?: number
}

export type ISourceAttached = ISource & IBaseModelAttached
export type ISourceToDB = Omit<ISource, 'referenceId'>

export interface ISourceWithDetailsToDB {
  source: ISourceToDB
  reference: IReference
  regions: IRegion[]
}

export interface ISourceDetails
  extends Omit<ISource, 'authorId' | 'evidenceId'>, IBaseModelAttached {
  reference: IReferenceAttached
  regions: IRegionAttached[]
}
