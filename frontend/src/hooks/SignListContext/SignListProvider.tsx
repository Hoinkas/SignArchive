import { useEffect, useState } from 'react'
import React from 'react'
import { SignListContext } from './SignListContext'
import { signApi } from '@src/services/sign.api'
import type { ISignSimple } from '@src/models/sign.model'

interface Props {
  children?: React.ReactNode
}

export default function SignListProvider({ children }: Props): React.JSX.Element {
  const [signList, setSignList] = useState<ISignSimple[]>([])
  const [signListLoading, setSignListLoading] = useState<boolean>(true)

  useEffect(() => {
    signApi.list().then((data) => setSignList(data)).finally(() => setSignListLoading(false))
  }, [])

  return (
    <SignListContext.Provider value={{ signList, signListLoading }}>
      {children}
    </SignListContext.Provider>
  )
}
