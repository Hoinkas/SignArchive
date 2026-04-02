import { useState } from 'react'
import React from 'react'
import { SignToDB, SignWithDetails, SignWithDetailsToDB } from '@shared/types'
import { SignContext } from './SignContext'

interface Props {
  children?: React.ReactNode
}

export default function SignProvider({ children }: Props): React.JSX.Element {
  const [signs, setSigns] = useState<SignWithDetails[]>([])

  const initiateSigns = (signs: SignWithDetails[]): void => {
    setSigns(signs)
  }

  const addSign = (data: SignWithDetailsToDB, closeForm: () => void): void => {
    window.api.sign.create(data).then((result) => {
      setSigns((prevState) => [...prevState, result])
      closeForm()
    })
  }

  const editSign = (signId: string, updatedSign: SignToDB, closeForm: () => void): void => {
    window.api.sign.update(signId, updatedSign).then((result) => {
      setSigns((prevState) => prevState.map((s) => (s.id === signId ? { ...s, result } : s)))
      closeForm()
    })
  }

  const deleteSign = (deleteId: string): void => {
    window.api.sign.delete(deleteId).then(() => {
      setSigns((prevState) => prevState.filter((s) => s.id !== deleteId))
    })
  }

  return (
    <SignContext.Provider
      value={{
        signs,
        initiateSigns,
        addSign,
        editSign,
        deleteSign
      }}
    >
      {children}
    </SignContext.Provider>
  )
}
