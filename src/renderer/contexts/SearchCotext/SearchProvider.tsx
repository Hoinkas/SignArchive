import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { DropdownOption } from '@renderer/components/Form/Components/FormDropdown'
import { useWord } from '@contexts/WordContext/useWord'
import { WordWithCountCategories } from '@shared/types'
import { SearchContext } from './SearchContext'

interface Props {
  children?: React.ReactNode
}

export default function SearchProvider({ children }: Props): React.JSX.Element {
  const { wordsList } = useWord()

  const [searchWord, setSearchWord] = useState('')
  const [categoriesOptions, setCategoriesOptions] = useState<DropdownOption[]>([])
  const [categoryOption, setCategoryOption] = useState<DropdownOption | null>(null)
  const [regionsOptions, setRegionsOptions] = useState<DropdownOption[]>([])
  const [regionOption, setRegionOption] = useState<DropdownOption | null>(null)

  console.log(wordsList)

  useEffect(() => {
    window.api.tag.list().then((result) =>
      setCategoriesOptions(
        result.map((t) => {
          return { id: t.id, label: t.name }
        })
      )
    )
    window.api.source.regions().then((result) =>
      setRegionsOptions(
        result.map((r, key) => {
          return { id: key.toString(), label: r }
        })
      )
    )
  }, [])

  const filteredWords = useMemo((): WordWithCountCategories[] => {
    const upper = searchWord.toUpperCase()

    return wordsList.filter((w) => {
      if (searchWord && !w.text.toUpperCase().includes(upper)) return false
      if (categoryOption && !w.categories.some((c) => c.id === categoryOption.id)) return false
      if (regionOption && !w.regions.includes(regionOption.label)) return false
      return true
    })
  }, [wordsList, searchWord, categoryOption, regionOption])

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
