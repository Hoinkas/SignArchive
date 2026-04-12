import type { IBaseModelAttached } from './base.interface'

export type DefinitionsCategories =
  | 'autonomiczne'
  | 'czasownik'
  | 'liczebnik'
  | 'metatekst'
  | 'partykuła'
  | 'pragmatyczne'
  | 'przyimek'
  | 'przymiotnik'
  | 'przysłówek'
  | 'rzeczownik'
  | 'spójnik'
  | 'zaimek'

export interface IDefinition {
  category: DefinitionsCategories
  text: string
  translations?: string
}

export interface IDefinitionToDB extends IDefinition {
  signId: string
  wordId: string
}

export interface IDefinitionCategoryWithCount {
  name: DefinitionsCategories
  count: number
}

export interface IDefinitionsCategoriesGrouped {
  category: DefinitionsCategories
  definitions: IDefinitionAttached[]
}

export type IDefinitionAttached = IDefinition & IBaseModelAttached
