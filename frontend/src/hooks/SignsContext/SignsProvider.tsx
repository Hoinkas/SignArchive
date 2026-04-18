import { useCallback, useState } from 'react'
import React from 'react'
import { SignContext } from './SignsContext'
import { signApi } from '@src/services/sign.api'
import type { ISignSimple } from '@src/models/sign.model'

interface Props {
  children?: React.ReactNode
}

export default function SignsProvider({ children }: Props): React.JSX.Element {
  const [signList, setSignList] = useState<ISignSimple[]>([])
  const [signListLoading, setSignListLoading] = useState<boolean>(false)

  const initiateSigns = useCallback((): void => {
    setSignListLoading(true)
    setSignList([])
    signApi.list().then((data) => {
      setSignList(data)
      setSignListLoading(false)
    })
  }, [])

  // const addSign = (data: ISignDetailsToDB, closeForm: () => void): void => {
  //   signApi.create(data).then((result) => {
  //     setSigns((prev) => [...prev, result])
  //     changeSignCountInWord('add')
  //     closeForm()
  //   })
  // }

  // const editSign = (signId: string, updatedSign: Partial<ISignDetailsEdit>, closeForm: () => void): void => {
  //   signApi.update(signId, updatedSign).then((result) => {
  //     setSigns((prev) => prev.map((s) => (
  //       s.id === signId
  //         ? { ...s, ...result, media: updatedSign.media ?? s.media }
  //         : s
  //     )))
  //     closeForm()
  //   })
  // }

  // const deleteSign = (deleteId: string): void => {
  //   signApi.delete(deleteId).then(() => {
  //     setSigns((prev) => prev.filter((s) => s.id !== deleteId))
  //     changeSignCountInWord('remove')
  //   })
  // }

  // const updateSignSource = (signId: string, years: IYearsRegions, delta: number): void => {
  //   if (!word) return

  //   setSigns((prev) => prev.map((s) =>
  //       s.id === signId ? { ...s, ...years, sourcesCount: s.sourcesCount + delta } : s
  //     ))
  // }

  return (
    <SignContext.Provider value={{ signList, signListLoading, initiateSigns }}>
      {children}
    </SignContext.Provider>
  )
}
