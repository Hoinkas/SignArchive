import type { IBaseModelAttached } from './base.interface'

export interface IUser {
  email: string
  login: string
  password: string
  isActivated: number
  nickname?: string
  contact?: string
  description?: string
}

export type IUserAttached = IUser & IBaseModelAttached

// TEMPLATES
export const userTemplate: Record<keyof IUser, null> = {
  email: null,
  login: null,
  password: null,
  isActivated: null,
  nickname: null,
  contact: null,
  description: null
}
