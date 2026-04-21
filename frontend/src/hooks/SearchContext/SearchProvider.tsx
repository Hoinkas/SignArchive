import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { SearchContext } from './SearchContext'
import { regionApi } from '@src/services/region.api'
import { wordApi } from '@src/services/word.api'
import type { IWordAttached } from '@src/models/word.model'

export type SearchOption = 'region' | 'startYear' | 'endYear'

interface Props {
  children?: React.ReactNode
}

import { useSearchParams } from 'react-router-dom'

export default function SearchProvider({ children }: Props): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allWords, setAllWords] = useState<IWordAttached[]>([])
  const [regionList, setRegionList] = useState<string[]>([])

  const searchWord = searchParams.get('word') ?? ''
  const yearStart = searchParams.get('yearStart') ?? ''
  const yearEnd = searchParams.get('yearEnd') ?? ''
  const region = searchParams.get('region') ?? ''

  useEffect(() => {
    regionApi.list().then((result) =>
      setRegionList(result.map((r) => r.name))
    )
    wordApi.list().then(setAllWords)
  }, [])

  const filteredWords = useMemo((): string[] => {
    if (searchWord === '') return []
    const upper = searchWord.toUpperCase()
    return allWords
      .filter((w) => w.name.toUpperCase().includes(upper))
      .map((w) => w.name)
  }, [allWords, searchWord])

  function updateParam(key: string, value: string | null): void {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value === null || value === '') next.delete(key)
      else next.set(key, value)
      return next
    })
  }

  const handleOptionChange = (type: SearchOption, value: string): void => {
    if (type === 'region') updateParam('region', value ?? null)
  }

  const handleYearChange = (yearType: 'yearStart' | 'yearEnd', year: string): void => {
    updateParam(yearType, year)
  }

  const handleNameChange = (value: string): void => {
    updateParam('word', value.replaceAll('\u00A0', '').trimEnd())
  }

  const handleClear = (): void => {
    handleNameChange('')
    handleOptionChange('region', '')
    handleYearChange('yearStart', '')
    handleYearChange('yearEnd', '')
    setSearchParams(new URLSearchParams())
  }

  return (
    <SearchContext.Provider value={{
      searchWord,
      filteredWords,
      regionList,
      region,
      handleOptionChange,
      handleNameChange,
      yearStart,
      yearEnd,
      handleYearChange,
      handleClear
    }}>
      {children}
    </SearchContext.Provider>
  )
}
