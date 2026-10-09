import type { IBaseModelAttached } from './base.interface'

export interface ISource {
  referenceId: string
  notes?: string
  yearStart?: number
  yearEnd?: number
}

export type ISourceAttached = ISource & IBaseModelAttached

// TEMPLATES
export const sourceTemplate: Record<keyof ISource, null> = {
  referenceId: null,
  notes: null,
  yearStart: null,
  yearEnd: null
}
