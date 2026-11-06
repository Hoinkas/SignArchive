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
  const [allSigns, setAllSigns] = useState<ISignSimple[]>([])
  const [signListLoading, setSignListLoading] = useState<boolean>(true)

  useEffect(() => {
    signApi.list().then((data) => setAllSigns(data)).finally(() => setSignListLoading(false))
  }, [])

  const filteredSigns = useMemo((): ISignSimple[] => {
    const isWordFilterActive = searchWord !== ''

    return allSigns.filter((s) => {
      const hasWord = !isWordFilterActive || s.words.some((w) => filteredWords.includes(w.name))
      const hasRegion = !region || s.regions.some((r) => [r.name, r.parentName].includes(region))
      const isAboveYearStart = yearStart === '' || (s.years.yearStart && s.years.yearStart >= parseInt(yearStart))
      const isBelowYearEnd = yearEnd === '' || (s.years.yearEnd && s.years.yearEnd <= parseInt(yearEnd))

      return hasWord && hasRegion && isAboveYearStart && isBelowYearEnd
    })
  }, [allSigns, region, filteredWords, yearStart, yearEnd, searchWord])

  return (
    <SignListContext.Provider value={{ allSigns, filteredSigns, signListLoading }}>
      {children}
    </SignListContext.Provider>
  )
}
