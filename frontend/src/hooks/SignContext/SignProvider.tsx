import { useCallback, useMemo, useRef, useState } from 'react'
import React from 'react'
import { SignContext } from './SignContext'
import { signApi } from '@src/services/sign.api'
import type { ISignDetails, ISignDetailsToDB } from '@src/models/sign.model'
import { useSignList } from '../SignListContext/useSignList'
import { mapDetailedSignToSimple } from '@src/utils/signsTypesHelpers'
import type { IMediaToDB } from '@src/models/media.model'
import { mediaApi } from '@src/services/media.api'

interface Props {
  children?: React.ReactNode
}

export default function SignProvider({ children }: Props): React.JSX.Element {
  const { addSignToSignList, editSignInSignList, deleteSignFromSignList } = useSignList()

  const [sign, setSign] = useState<ISignDetails | null>(null)
  const [signLoading, setSignLoading] = useState<boolean>(false)
  const currentSignId = useRef<string | null>(null)

  const initiateSign = useCallback((signId: string): void => {
    setSignLoading(true)
    signApi.details(signId).then((data) => {
      setSign(data)
      setSignLoading(false)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  const openCloseSidePanel = useCallback((signId: string): void => {
    if (currentSignId.current === signId) {
      setSign(null)
      currentSignId.current = null
      return
    }
    currentSignId.current = signId
    initiateSign(signId)
  }, [initiateSign])

  const simpleSign = useMemo(() => {
    if (!sign) return null
    return mapDetailedSignToSimple(sign)
  },[sign])

  const addSignAndMedia = (data: ISignDetailsToDB, media: IMediaToDB, closeForm: () => void): void => {
    mediaApi.create(media)
      .then((media) => signApi.create({ ...data, mediaId: media.id }))
      .then((result) => {
        addSignToSignList(result)
        closeForm()
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  }

  const editSignAndMedia = (signId: string, signChanges: Partial<ISignDetailsToDB>, mediaChanges: Partial<IMediaToDB>, closeForm: () => void): void => {
    Promise.all([
      mediaChanges ? mediaApi.update(sign!.media.id, mediaChanges) : Promise.resolve(),
      Object.keys(signChanges).length > 0 ? signApi.update(signId, signChanges) : Promise.resolve()
    ])
      .then(() => {
        setSign((prev) => {
          const updated = { ...prev, ...signChanges } as ISignDetails
          editSignInSignList(mapDetailedSignToSimple(updated))
          return updated
        })
        closeForm()
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  }

  const deleteSignAndMedia = (deleteId: string): void => {
    signApi.delete(deleteId)
      .then(() => {
        setSign(null)
        deleteSignFromSignList(deleteId)
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  }

  return (
    <SignContext.Provider value={{ sign, simpleSign, signLoading, openCloseSidePanel, addSignAndMedia, editSignAndMedia, deleteSignAndMedia }}>
      {children}
    </SignContext.Provider>
  )
}
