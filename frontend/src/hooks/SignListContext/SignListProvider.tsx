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
    signApi.list().then((data) => {
      setSignList(data)
      setSignListLoading(false)
    })
  }, [])

  const addSignToSignList = (data: ISignSimple): void => {
    setSignList((prev) => [...prev, data])
  }

  const editSignInSignList = (data: ISignSimple): void => {
    setSignList((prev) => prev.map((s) => (
      s.id === data.id
        ? { ...s, ...data }
        : s
    )))
  }

  const deleteSignFromSignList = (signId: string): void => {
    setSignList((prev) => prev.filter((s) => s.id !== signId))
  }

  return (
    <SignListContext.Provider value={{ signList, signListLoading, addSignToSignList, editSignInSignList, deleteSignFromSignList }}>
      {children}
    </SignListContext.Provider>
  )
}
