import { useContext } from 'react'
import { PermissionsContext, type PermissionsContextValue } from './PermissionsContext'

export function usePermissions(): PermissionsContextValue {
  const context = useContext(PermissionsContext)
  if (!context) throw new Error('usePermissions must be used within <PermissionsProvider/>')
  return context
}
