import { useCallback, useState } from 'react'
import React from 'react'
import type { SignDetails, SignDetailsToDB, SignToDB } from '@shared/types'
import { SignContext } from './SignsContext'
import { useWord } from '@contexts/WordContext/useWord'
import { signApi } from '@src/api/sign.api'

interface Props {
  children?: React.ReactNode
}

export default function SignsProvider({ children }: Props): React.JSX.Element {
  const { changeSignCountInWord, word } = useWord()
  const [signs, setSigns] = useState<SignDetails[]>([])

  const initiateSigns = useCallback((wordId: string): void => {
    signApi.list(wordId).then(setSigns)
  }, [])

  const addSign = (data: SignDetailsToDB, closeForm: () => void): void => {
    signApi.create(data).then((result) => {
      setSigns((prev) => [...prev, result])
      changeSignCountInWord('add')
      closeForm()
    })
  }

  const editSign = (signId: string, updatedSign: Partial<SignToDB>, closeForm: () => void): void => {
    signApi.update(signId, updatedSign).then((result) => {
      setSigns((prev) => prev.map((s) => (s.id === signId ? { ...s, ...result } : s)))
      closeForm()
    })
  }

  const deleteSign = (deleteId: string): void => {
    signApi.delete(deleteId).then(() => {
      setSigns((prev) => prev.filter((s) => s.id !== deleteId))
      changeSignCountInWord('remove')
    })
  }

  const updateSignSource = (signId: string, action?: 'add' | 'delete'): void => {
    if (!word) return
    signApi.yearsRegions(signId, word.id).then((result) => {
      setSigns((prev) => {
        const delta = action ? (action === 'add' ? 1 : -1) : 0
        return prev.map((s) =>
          s.id === signId ? { ...s, ...result, sourcesCount: s.sourcesCount + delta } : s
        )
      })
    })
  }

  return (
    <SignContext.Provider value={{ signs, initiateSigns, addSign, editSign, deleteSign, updateSignSource }}>
      {children}
    </SignContext.Provider>
  )
}
