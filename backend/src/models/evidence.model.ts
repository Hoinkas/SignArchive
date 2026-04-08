import type { IBaseModelAttached } from './base.interface'

export interface IEvidence {
  name: string
  fullName: string
  url?: string
}

export type IEvidenceAttached = IEvidence & IBaseModelAttached
