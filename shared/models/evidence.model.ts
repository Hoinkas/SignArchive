import type { IBaseModelAttached } from './base.interface'

export type EvidenceType = 'książka' | 'url' | 'osobiste'

export interface IEvidence {
  name: string
  fullName: string
  type: EvidenceType
  url?: string
}

export type IEvidenceAttached = IEvidence & IBaseModelAttached
