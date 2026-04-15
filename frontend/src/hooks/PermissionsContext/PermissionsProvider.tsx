import { useState } from 'react'
import React from 'react'
import { PermissionsContext } from './PermissionsContext'
import type { ILogin } from '@src/models/login.model'
import { authApi } from '@src/services/auth.api'

interface Props {
  children?: React.ReactNode
}

export default function PermissionsProvider({ children }: Props): React.JSX.Element {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => !!localStorage.getItem('token'))

  function checkLogin(login: ILogin) {
    authApi.login(login.user, login.password).then((result) => {
      if (result.token) {
        localStorage.setItem('token', result.token)
        setIsAdmin(true)
      }
    })
  }

  function logout() {
    localStorage.removeItem('token')
    setIsAdmin(false)
  }

  return (
    <PermissionsContext.Provider
      value={{
        isAdmin,
        checkLogin,
        logout
      }}
    >
      {children}
    </PermissionsContext.Provider>
  )
}
