import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { SearchContext } from './SearchContext'
import { regionApi } from '@src/services/region.api'
import { wordApi } from '@src/services/word.api'
import type { IWordAttached } from '@src/models/word.model'
import { useSearchParams } from 'react-router-dom'
import updateParam from '@src/utils/updateParam'

export type SearchOption = 'region' | 'startYear' | 'endYear'

interface Props {
  children?: React.ReactNode
}

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

  const handleOptionChange = (type: SearchOption, value: string): void => {
    if (type === 'region') updateParam('region', value ?? null, setSearchParams)
  }

  const handleYearChange = (yearType: 'yearStart' | 'yearEnd', year: string): void => {
    updateParam(yearType, year, setSearchParams)
  }

  const handleNameChange = (value: string): void => {
    updateParam('word', value.replaceAll('\u00A0', '').trimEnd(), setSearchParams)
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
