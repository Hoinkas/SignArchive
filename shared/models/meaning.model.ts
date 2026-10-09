import type { IBaseModelAttached } from './base.interface'

export interface IMeaning {
  explanation: string
  signId: string
}

export type IMeaningAttached = IMeaning & IBaseModelAttached

// TEMPLATES
export const meaningTemplate: Record<keyof IMeaning, null> = {
  explanation: null,
  signId: null
}