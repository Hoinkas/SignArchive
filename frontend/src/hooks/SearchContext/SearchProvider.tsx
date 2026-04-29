import { useEffect, useMemo, useRef, useState } from 'react'
import React from 'react'
import { SearchContext } from './SearchContext'
import { regionApi } from '@src/services/region.api'
import { wordApi } from '@src/services/word.api'
import type { IWordAttached } from '@src/models/word.model'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Fuse from 'fuse.js'

export type SearchOption = 'region' | 'startYear' | 'endYear'

interface Props {
  children?: React.ReactNode
}

export default function SearchProvider({ children }: Props): React.JSX.Element {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [allWords, setAllWords] = useState<IWordAttached[]>([])
  const [regionList, setRegionList] = useState<string[]>([])
  const navigate = useNavigate()

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

  const fuse = useMemo(() => new Fuse(allWords, {
    keys: ['name'],
    threshold: 0.3,
    distance: 100,
    minMatchCharLength: 2,
  }), [allWords])

  const filteredWords = useMemo((): string[] => {
    if (searchWord === '') return []

    const results = fuse.search(searchWord)
    return results.map((r) => r.item.name)
  }, [fuse, searchWord])

  const navigateWithParams = (updates: Record<string, string | null>): void => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) newParams.set(key, value)
      else newParams.delete(key)
    })
    navigate({ pathname: '/signs/', search: newParams.toString() })
  }

  const handleNameChange = (value: string): void => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      navigateWithParams({ word: value.replaceAll('\u00A0', '').trimEnd() || null })
    }, 300)
  }

  const handleOptionChange = (type: SearchOption, value: string): void => {
    if (type === 'region') navigateWithParams({ region: value ?? null })
  }

  const handleYearChange = (yearType: 'yearStart' | 'yearEnd', year: string): void => {
    navigateWithParams({ [yearType]: year })
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
