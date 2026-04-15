import { useCallback, useState } from 'react'
import React from 'react'
import { SignContext } from './SignsContext'
import { useWord } from '@src/hooks/WordContext/useWord'
import { signApi } from '@src/services/sign.api'
import type { ISignDetails, ISignDetailsEdit, ISignDetailsToDB } from '@src/models/sign.model'
import type { IYearsRegions } from '@src/models/yearStartEnd.model'

interface Props {
  children?: React.ReactNode
}

export default function SignsProvider({ children }: Props): React.JSX.Element {
  const { changeSignCountInWord, word } = useWord()
  const [signs, setSigns] = useState<ISignDetails[]>([])
  const [loadSigns, setLoadSigns] = useState<boolean>(false)

  const initiateSigns = useCallback((wordId: string): void => {
    setLoadSigns(true)
    setSigns([])
    signApi.list(wordId).then((data) => {
      setSigns(data)
      setLoadSigns(false)
    })
  }, [])

  const addSign = (data: ISignDetailsToDB, closeForm: () => void): void => {
    signApi.create(data).then((result) => {
      setSigns((prev) => [...prev, result])
      changeSignCountInWord('add')
      closeForm()
    })
  }

  const editSign = (signId: string, updatedSign: Partial<ISignDetailsEdit>, closeForm: () => void): void => {
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

  const updateSignSource = (signId: string, years: IYearsRegions, delta: number): void => {
    if (!word) return

    setSigns((prev) => prev.map((s) =>
        s.id === signId ? { ...s, ...years, sourcesCount: s.sourcesCount + delta } : s
      ))
  }

  return (
    <SignContext.Provider value={{ signs, initiateSigns, addSign, editSign, deleteSign, updateSignSource, loadSigns }}>
      {children}
    </SignContext.Provider>
  )
}
