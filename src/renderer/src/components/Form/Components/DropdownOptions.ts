import { DefinitionsCategories } from '@shared/types'

export interface DropdownOption {
  id: string
  label: string
}

export const categoriesOptions: DropdownOption[] = [
  { id: '1', label: 'rzeczownik' },
  { id: '2', label: 'czasownik' },
  { id: '3', label: 'przymiotnik' }
] //TODO add separate categories table

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
