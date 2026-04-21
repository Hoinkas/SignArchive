import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import type { DropdownOption } from '@src/components/Form/Components/FormDropdown'
import { SearchContext } from './SearchContext'
import { regionApi } from '@src/services/region.api'
import { wordApi } from '@src/services/word.api'
import type { IWordAttached } from '@src/models/word.model'

export type SearchOption = 'region' | 'startYear' | 'endYear'

interface Props {
  children?: React.ReactNode
}

export default function SearchProvider({ children }: Props): React.JSX.Element {
  const [searchWord, setSearchWord] = useState('')
  const [allWords, setAllWords] = useState<IWordAttached[]>([])
  const [regionsOptions, setRegionsOptions] = useState<DropdownOption[]>([])
  const [regionOption, setRegionOption] = useState<DropdownOption | null>(null)

  useEffect(() => {
    regionApi.list().then((result) =>
      setRegionsOptions(result.map((r) => ({ id: r.id, label: r.name })))
    )
    wordApi.list().then(setAllWords)
  }, [])

  const filteredWords = useMemo((): string[] => {
    const upper = searchWord.toUpperCase()

    return allWords.filter((w) => {
      if (searchWord !== '' && !w.name.toUpperCase().includes(upper)) return false
      return true
    }).map((w) => w.name)
  }, [allWords, searchWord])

  const handleChange = (type: SearchOption, value: DropdownOption | null): void => {
    if (type === 'region') setRegionOption(value)
  }

  const handleNameChange = (value: string): void => {
    setSearchWord(value.replaceAll('\u00A0', '').trimEnd())
  }

  return (
    <SearchContext.Provider
      value={{
        searchWord,
        filteredWords,
        regionsOptions,
        regionOption,
        handleChange,
        handleNameChange
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
