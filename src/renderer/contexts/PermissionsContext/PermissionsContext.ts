import { createContext } from 'react'

export interface PermissionsContextValue {
  isAdmin: boolean
}

export const PermissionsContext = createContext<PermissionsContextValue>({
  isAdmin: false
})
