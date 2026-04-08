import type { DefinitionsCategories } from '@shared/types'

export interface DropdownOption {
  id: string
  label: string
}

export const DEFINITIONS_CATEGORIES: DefinitionsCategories[] = [
  'autonomiczne',
  'czasownik',
  'liczebnik',
  'metatekst',
  'partykuła',
  'pragmatyczne',
  'przyimek',
  'przymiotnik',
  'przysłówek',
  'rzeczownik',
  'spójnik',
  'zaimek'
]

export const categoriesOptions: DropdownOption[] = DEFINITIONS_CATEGORIES.map((e, key) => {
  return { id: key.toString(), label: e }
}) //TODO add separate categories table
