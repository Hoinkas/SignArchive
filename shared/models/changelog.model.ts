import type { IBaseModelAttached } from './base.interface'

export interface IChangelog {
  tableName: string
  fieldName: string
  recordId: string
  oldValue?: string
  newValue: string
  addBy: string
  readonly addDate: number //ISO Date
}

export type IChangelogAttached = IChangelog & IBaseModelAttached

// TEMPLATES
export const changelogTemplate: Record<keyof IChangelog, null> = {
  tableName: null,
  fieldName: null,
  recordId: null,
  oldValue: null,
  newValue: null,
  addBy: null,
  addDate: null
}
