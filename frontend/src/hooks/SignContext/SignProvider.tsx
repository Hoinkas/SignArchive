import { useCallback, useState } from 'react'
import React from 'react'
import { SignContext } from './SignContext'
import { signApi } from '@src/services/sign.api'
import type { ISignDetails, ISignDetailsToDB } from '@src/models/sign.model'
import { useSignList } from '../SignListContext/useSignList'
import { mapDetailedSignToSimple } from '@src/utils/signsTypesHelpers'

interface Props {
  children?: React.ReactNode
}

export default function SignProvider({ children }: Props): React.JSX.Element {
  const { addSignToSignList, editSignInSignList, deleteSignFromSignList } = useSignList()

  const [sign, setSign] = useState<ISignDetails | null>(null)
  const [signLoading, setSignLoading] = useState<boolean>(false)

  const initiateSign = useCallback((signId: string): void => {
    setSignLoading(true)
    signApi.details(signId).then((data) => {
      setSign(data)
      setSignLoading(false)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  const addSign = (data: ISignDetailsToDB, closeForm: () => void): void => {
    signApi.create(data).then((result) => {
      addSignToSignList(result)
      closeForm()
    }).catch((err) => {
      console.error(err)
    })
  }

  const editSign = (signId: string, updatedSign: Partial<ISignDetails>, closeForm: () => void): void => {
    signApi.update(signId, updatedSign).then(() => {

      setSign((prevState) => {
        const detailed = {...prevState, ...updatedSign}
        editSignInSignList(mapDetailedSignToSimple(detailed))
        return detailed
      })
      closeForm()
    }).catch((err) => {
      console.error(err)
    })
  }

  const deleteSign = (deleteId: string): void => {
    signApi.delete(deleteId).then(() => {
      setSign(null)
      deleteSignFromSignList(deleteId)
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <SignContext.Provider value={{ sign, signLoading, initiateSign, addSign, editSign, deleteSign }}>
      {children}
    </SignContext.Provider>
  )
}
