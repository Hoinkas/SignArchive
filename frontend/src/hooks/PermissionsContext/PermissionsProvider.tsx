import { useState } from 'react'
import React from 'react'
import { PermissionsContext } from './PermissionsContext'

interface Props {
  children?: React.ReactNode
}

export default function PermissionsProvider({ children }: Props): React.JSX.Element {
  const [isAdmin, setIsAdmin] = useState<boolean>(true)

  return (
    <PermissionsContext.Provider
      value={{
        isAdmin
      }}
    >
      {children}
    </PermissionsContext.Provider>
  )
}
