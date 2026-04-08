import type {
  DefinitionsCategories,
  IDefinitionAttached,
  IDefinitionCategoryWithCount,
  IDefinitionsCategoriesGrouped,
  IDefinitionToDB
} from '@src/models/definition.model'
import type { ISignDetails } from '@src/models/sign.model'
import { createContext } from 'react'

export interface DefinitionsContextValue {
  definitions: IDefinitionsCategoriesGrouped[]
  initiateDefinitions: (sign: ISignDetails) => void
  categories: IDefinitionCategoryWithCount[]
  categoriesNames: DefinitionsCategories[]
  translations: string[]
  activeCategory: DefinitionsCategories | null
  changeActiveCategory: (category: DefinitionsCategories) => void
  filteredDefinitions: IDefinitionAttached[]
  addDefinition: (data: IDefinitionToDB, closeForm: () => void) => void
  editDefinition: (definitionId: string, data: IDefinitionToDB, closeForm: () => void) => void
  deleteDefinition: (definitionId: string) => void
}

export const DefinitionsContext = createContext<DefinitionsContextValue>({
  definitions: [],
  initiateDefinitions: () => {},
  categories: [],
  categoriesNames: [],
  translations: [],
  activeCategory: null,
  changeActiveCategory: () => {},
  filteredDefinitions: [],
  addDefinition: () => {},
  editDefinition: () => {},
  deleteDefinition: () => {}
})
