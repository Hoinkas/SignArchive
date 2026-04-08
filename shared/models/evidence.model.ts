import type { IBaseModelAttached } from './base.interface'

export interface IEvidence {
  fileUrl: string
}

export type IEvidenceAttached = IEvidence & IBaseModelAttached
