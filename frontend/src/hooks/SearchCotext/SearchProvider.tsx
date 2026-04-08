import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import type { DropdownOption } from '@src/components/Form/Components/FormDropdown'
import { useWord } from '@contexts/WordContext/useWord'
import type { WordWithCountCategories } from '@shared/types'
import { SearchContext } from './SearchContext'
import { tagApi } from '@src/api/tag.api'
import { sourceApi } from '@src/api/source.api'

interface Props {
  children?: React.ReactNode
}

export default function SearchProvider({ children }: Props): React.JSX.Element {
  const { allWords } = useWord()
  const [searchWord, setSearchWord] = useState('')
  const [categoriesOptions, setCategoriesOptions] = useState<DropdownOption[]>([])
  const [categoryOption, setCategoryOption] = useState<DropdownOption | null>(null)
  const [regionsOptions, setRegionsOptions] = useState<DropdownOption[]>([])
  const [regionOption, setRegionOption] = useState<DropdownOption | null>(null)

  useEffect(() => {
    tagApi.list().then((result) =>
      setCategoriesOptions(result.map((t) => ({ id: t.id, label: t.name })))
    )
    sourceApi.regions().then((result) =>
      setRegionsOptions(result.map((r, key) => ({ id: key.toString(), label: r })))
    )
  }, [])

  const filteredWords = useMemo((): WordWithCountCategories[] => {
    const upper = searchWord.toUpperCase()

    return allWords.filter((w) => {
      if (searchWord && !w.text.toUpperCase().includes(upper)) return false
      if (categoryOption && !w.categories.some((c) => c.id === categoryOption.id)) return false
      if (regionOption && !w.regions.includes(regionOption.label)) return false
      return true
    })
  }, [allWords, searchWord, categoryOption, regionOption])

  const handleChange = (type: 'category' | 'region', value: DropdownOption | null): void => {
    if (type === 'category') setCategoryOption(value)
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
        categoriesOptions,
        categoryOption,
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
