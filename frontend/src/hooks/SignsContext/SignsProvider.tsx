import { useCallback, useState } from 'react'
import React from 'react'
import { SignContext } from './SignsContext'
import { useWord } from '@src/hooks/WordContext/useWord'
import { signApi } from '@src/services/sign.api'
import type { ISignDetails, ISignDetailsToDB } from '@src/models/sign.model'

interface Props {
  children?: React.ReactNode
}

export default function SignsProvider({ children }: Props): React.JSX.Element {
  const { changeSignCountInWord, word } = useWord()
  const [signs, setSigns] = useState<ISignDetails[]>([])

  const initiateSigns = useCallback((wordId: string): void => {
    signApi.list(wordId).then(setSigns)
  }, [])

  const addSign = (data: ISignDetailsToDB, closeForm: () => void): void => {
    signApi.create(data).then((result) => {
      setSigns((prev) => [...prev, result])
      changeSignCountInWord('add')
      closeForm()
    })
  }

  const editSign = (signId: string, updatedSign: Partial<ISignDetailsToDB>, closeForm: () => void): void => {
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
