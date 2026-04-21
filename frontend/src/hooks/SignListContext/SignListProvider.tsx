import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { SignListContext } from './SignListContext'
import { signApi } from '@src/services/sign.api'
import type { ISignSimple } from '@src/models/sign.model'
import { useSearch } from '../SearchContext/useSearch'

interface Props {
  children?: React.ReactNode
}

export default function SignListProvider({ children }: Props): React.JSX.Element {
  const {filteredWords, searchWord, region, yearStart, yearEnd} = useSearch()
  const [signList, setSignList] = useState<ISignSimple[]>([])
  const [signListLoading, setSignListLoading] = useState<boolean>(true)

  useEffect(() => {
    signApi.list().then((data) => {
      setSignList(data)
      setSignListLoading(false)
    })
  }, [])

  const addSignToSignList = (data: ISignSimple): void => {
    setSignList((prev) => [...prev, data])
  }

  const editSignInSignList = (data: ISignSimple): void => {
    setSignList((prev) => prev.map((s) => (
      s.id === data.id ? { ...s, ...data } : s
    )))
  }

  const deleteSignFromSignList = (signId: string): void => {
    setSignList((prev) => prev.filter((s) => s.id !== signId))
  }

  const filteredSigns = useMemo((): ISignSimple[] => {
    const isWordFilterActive = searchWord !== ''

    return signList.filter((s) => {
      const hasWord = !isWordFilterActive || s.words.some((w) => filteredWords.includes(w))
      const hasRegion = !region || s.regions.includes(region)
      const isAboveYearStart = yearStart === '' || (s.years.yearStart !== null && s.years.yearStart >= parseInt(yearStart))
      const isBelowYearEnd = yearEnd === '' || (s.years.yearEnd !== null && s.years.yearEnd <= parseInt(yearEnd))

      return hasWord && hasRegion && isAboveYearStart && isBelowYearEnd
    })
  }, [signList, region, filteredWords, yearStart, yearEnd, searchWord])

  return (
    <SignListContext.Provider value={{ filteredSigns, signListLoading, addSignToSignList, editSignInSignList, deleteSignFromSignList }}>
      {children}
    </SignListContext.Provider>
  )
}
