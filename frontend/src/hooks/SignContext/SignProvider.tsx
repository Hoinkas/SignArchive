import { useCallback, useMemo, useState } from 'react'
import React from 'react'
import { SignContext } from './SignContext'
import type { ISignSimple } from '@src/models/sign.model'
import { useSearchParams } from 'react-router'
import updateParam from '@src/utils/updateParam'

interface Props {
  children?: React.ReactNode
}

export default function SignProvider({ children }: Props): React.JSX.Element {
  const [sign, setSign] = useState<ISignSimple | null>(null)
  const [signLoading, setSignLoading] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const paramsSignId = searchParams.get('signId') ?? ''

//   useEffect(() => {
//     if (!paramsSignId) return

//     signApi.details(paramsSignId)
//       .then((data) => setSign(data))
//       .catch(console.error)
//       .finally(() => setSignLoading(false))
//   }, [paramsSignId])

  const openCloseSidePanel = useCallback((sign: ISignSimple): void => {
    if (paramsSignId === sign.uniqueNumber) {
      setSign(null)
      updateParam('signId', null, setSearchParams)
      return
    }

    // setSignLoading(true)
    updateParam('signId', sign.uniqueNumber, setSearchParams)
    setSign(sign)
    // signApi.details(signId)
    //   .then((data) => {
    //     setSign(data)
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })
    //   .finally(() => setSignLoading(false))
  }, [paramsSignId, setSearchParams])

  const simpleSign = useMemo(() => {
    if (!sign) return null
    // return mapDetailedSignToSimple(sign)
    return sign
  },[sign])

  return (
    <SignContext.Provider value={{
    //   sign,
      simpleSign,
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
