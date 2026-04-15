import type { ILogin } from '@src/models/login.model'
import { createContext } from 'react'

export interface PermissionsContextValue {
  isAdmin: boolean
  checkLogin(login: ILogin): void
  logout(): void
}

export const PermissionsContext = createContext<PermissionsContextValue>({
  isAdmin: false,
  checkLogin: () => {},
  logout: () => {}
})
