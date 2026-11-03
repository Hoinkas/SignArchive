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

  const paramsSignId = searchParams.get('signId') ?? ''

  useEffect(() => {
    if (!paramsSignId) return

    signApi.details(paramsSignId)
      .then((data) => setSign(data))
      .catch(console.error)
      .finally(() => setSignLoading(false))
  }, [paramsSignId])

  const openCloseSidePanel = useCallback((signId: string): void => {
    if (paramsSignId === signId) {
      setSign(null)
      updateParam('signId', null, setSearchParams)
      return
    }

    setSignLoading(true)
    updateParam('signId', signId, setSearchParams)
    signApi.details(paramsSignId)
      .then((data) => {
        setSign(data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => setSignLoading(false))
  }, [paramsSignId, setSearchParams])

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
