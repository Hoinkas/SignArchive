import { useCallback, useState } from 'react'
import React from 'react'
import { SignToDB, SignDetails, SignDetailsToDB } from '@shared/types'
import { SignContext } from './SignsContext'
import { useWord } from '@contexts/WordContext/useWord'

interface Props {
  children?: React.ReactNode
}

export default function SignsProvider({ children }: Props): React.JSX.Element {
  const { changeSignCountInWord } = useWord()
  const [signs, setSigns] = useState<SignDetails[]>([])

  const initiateSigns = useCallback((wordId: string): void => {
    window.api.sign.list(wordId).then((result) => {
      setSigns(result)
    })
  }, [])

  const addSign = (data: SignDetailsToDB, closeForm: () => void): void => {
    window.api.sign.create(data).then((result) => {
      setSigns((prevState) => [...prevState, result])
      changeSignCountInWord('add')
      closeForm()
    })
  }

  const editSign = (signId: string, updatedSign: SignToDB, closeForm: () => void): void => {
    window.api.sign.update(signId, updatedSign).then((result) => {
      setSigns((prevState) => prevState.map((s) => (s.id === signId ? { ...s, ...result } : s)))
      closeForm()
    })
  }

  const deleteSign = (deleteId: string): void => {
    window.api.sign.delete(deleteId).then(() => {
      setSigns((prevState) => prevState.filter((s) => s.id !== deleteId))
      changeSignCountInWord('remove')
    })
  }

  const changeSourcesCountInSign = (action: 'add' | 'remove', signId: string): void => {
    const numberAction = action === 'add' ? 1 : -1
    setSigns((prevState) =>
      prevState.map((s) =>
        s.id === signId ? { ...s, sourcesCount: s.sourcesCount + numberAction } : s
      )
    )
  }

  return (
    <SignContext.Provider
      value={{
        signs,
        initiateSigns,
        addSign,
        editSign,
        deleteSign,
        changeSourcesCountInSign
      }}
    >
      {children}
    </SignContext.Provider>
  )
}
