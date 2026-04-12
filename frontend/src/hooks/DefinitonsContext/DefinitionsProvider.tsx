import React, { useCallback, useMemo, useState } from 'react'
import { DefinitionsContext } from './DefinitionsContext'
import { useWord } from '@src/hooks/WordContext/useWord'
import { definitionApi } from '@src/services/definition.api'
import type { ISignDetails } from '@src/models/sign.model'
import type { DefinitionsCategories, IDefinition, IDefinitionAttached, IDefinitionCategoryWithCount, IDefinitionsCategoriesGrouped, IDefinitionToDB } from '@src/models/definition.model'

interface Props {
  children?: React.ReactNode
}

export default function DefinitionsProvider({ children }: Props): React.JSX.Element {
  const { word } = useWord()
  const [sign, setSign] = useState<ISignDetails | null>(null)
  const [definitions, setDefinitions] = useState<IDefinitionsCategoriesGrouped[]>([])
  const [activeCategory, setActiveCategory] = useState<DefinitionsCategories | null>(null)

  const initiateDefinitions = useCallback((sign: ISignDetails): void => {
    const rawDefinitions = sign.definitions
    if (rawDefinitions.length === 0) return
    setSign(sign)

    const map = new Map<DefinitionsCategories, IDefinitionAttached[]>()
    rawDefinitions.forEach((d) => {
      if (!d.category) return
      if (!map.has(d.category)) map.set(d.category, [])
      map.get(d.category)!.push(d)
    })

    const grouped: IDefinitionsCategoriesGrouped[] = Array.from(map.entries()).map(
      ([category, definitions]) => ({ category, definitions })
    )
    setDefinitions(grouped)
    setActiveCategory(grouped[0]?.category ?? null)
  }, [])

  const categoriesNames = useMemo((): DefinitionsCategories[] => {
    return [...new Set(definitions.map((g) => g.category))]
  }, [definitions])

  const categories = useMemo((): IDefinitionCategoryWithCount[] => {
    const categoriesWithCounts: IDefinitionCategoryWithCount[] = []

    categoriesNames.forEach((c) => {
      const count = definitions.filter((d) => d.category === c).length
      categoriesWithCounts.push({ name: c, count })
    })

    return categoriesWithCounts
  }, [categoriesNames, definitions])

  const translations = useMemo((): string[] => {
    return [
      ...new Set(
        definitions
          .flatMap((g) => g.definitions)
          .flatMap((d) => d.translations?.split(',').map((t) => t.trim()) ?? [])
          .filter((t): t is string => !!t && t.toUpperCase() !== word?.text.toUpperCase())
      )
    ]
  }, [definitions, word?.text])

  const filteredDefinitions: IDefinitionAttached[] = useMemo(() => {
    const filteredDefinitions: IDefinitionAttached[] = []
    definitions.forEach((d) => {
      if (d.category !== activeCategory) return
      d.definitions.forEach((d) => {
        filteredDefinitions.push(d)
      })
    })

    return filteredDefinitions
  }, [activeCategory, definitions])

  const changeActiveCategory = (category: DefinitionsCategories): void => {
    setActiveCategory(category)
  }

  const addDefinition = (data: IDefinition, closeForm: () => void): void => {
    if (!sign || !word) return

    const dataToDB: IDefinitionToDB = { ...data, signId: sign.id, wordId: word.id }
    definitionApi.create(dataToDB).then((result) => {
      setDefinitions((prevState) => {
        const resultCategory = result.category
        const categoryExists = categories.some((c) => c.name === resultCategory)
        if (!categoryExists)
          return [...prevState, { category: resultCategory, definitions: [result] }]

        return prevState.map((prev) =>
          prev.category === resultCategory
            ? { ...prev, definitions: [...prev.definitions, result] }
            : prev
        )
      })
      closeForm()
    })
  }

  const editDefinition = (
    definitionId: string,
    data: IDefinition,
    closeForm: () => void
  ): void => {
    definitionApi.update(definitionId, data).then((result) => {
      if (!result) return

      setDefinitions((prevState) => {
        const withRemoved = prevState
          .map((group) => ({
            ...group,
            definitions: group.definitions.filter((d) => d.id !== definitionId)
          }))
          .filter((group) => group.definitions.length > 0)

        const existingGroup = withRemoved.find((g) => g.category === result.category)
        if (existingGroup) {
          return withRemoved.map((group) =>
            group.category === result.category
              ? { ...group, definitions: [...group.definitions, result] }
              : group
          )
        }

        return [...withRemoved, { category: result.category, definitions: [result] }]
      })

      closeForm()
    })
  }

  const deleteDefinition = (definitionId: string): void => {//TODO If it's the last definition block possibility of removing the last one
    definitionApi.delete(definitionId).then(() => {
      setDefinitions((prevState) =>
        prevState
          .map((group) => ({
            ...group,
            definitions: group.definitions.filter((d) => d.id !== definitionId)
          }))
          .filter((group) => group.definitions.length > 0)
      )
      setActiveCategory(categoriesNames[0] ?? null)
    })
  }

  return (
    <DefinitionsContext.Provider
      value={{
        definitions,
        initiateDefinitions,
        categories,
        categoriesNames,
        translations,
        activeCategory,
        changeActiveCategory,
        filteredDefinitions,
        addDefinition,
        editDefinition,
        deleteDefinition
      }}
    >
      {children}
    </DefinitionsContext.Provider>
  )
}
