import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import { SignContext } from './SignContext'
import type { ISignDetailed } from '@src/models/sign.model'
import { useSearchParams } from 'react-router'
import updateParam from '@src/utils/updateParam'
import { signApi } from '@src/services/sign.api'

interface Props {
  children?: React.ReactNode
}

export default function SignProvider({ children }: Props): React.JSX.Element {
  const [sign, setSign] = useState<ISignDetailed | null>(null)
  const [signLoading, setSignLoading] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const signNumber = searchParams.get('signNumber') ?? ''

  useEffect(() => {
    if (!signNumber) return

    signApi.details(signNumber)
      .then((data) => setSign(data))
      .catch(console.error)
      .finally(() => setSignLoading(false))
  }, [signNumber])

  const openCloseSidePanel = useCallback((uniqueNumber: string): void => {
    if (signNumber == uniqueNumber) {
      setSign(null)
      updateParam('signNumber', null, setSearchParams)
      return
    }

    setSignLoading(true)
    updateParam('signNumber', uniqueNumber, setSearchParams)
    signApi.details(uniqueNumber)
      .then((data) => {
        setSign(data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => setSignLoading(false))
  }, [signNumber, setSearchParams])

  return (
    <SignContext.Provider value={{
      sign,
      signLoading,
      openCloseSidePanel,
    //   addSignAndMedia,
    //   editSignAndMedia,
    //   deleteSignAndMedia,
    //   addMeaning,
    //   editMeaning,
    //   deleteMeaning,
    //   addSource,
    //   editSource,
    //   deleteSource
    }}>
      {children}
    </SignContext.Provider>
  )
}
