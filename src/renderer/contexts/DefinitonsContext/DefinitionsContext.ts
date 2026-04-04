import { createContext } from 'react'
import {
  Definition,
  DefinitionsCategories,
  DefinitionsCategoriesGrouped,
  DefinitionCategoryWithCount,
  DefinitionToCreate,
  SignDetails
} from '@shared/types'

export interface DefinitionsContextValue {
  definitions: DefinitionsCategoriesGrouped[]
  initiateDefinitions: (sign: SignDetails) => void
  categories: DefinitionCategoryWithCount[]
  categoriesNames: DefinitionsCategories[]
  translations: string[]
  activeCategory: DefinitionsCategories | null
  changeActiveCategory: (category: DefinitionsCategories) => void
  filteredDefinitions: Definition[]
  addDefinition: (data: DefinitionToCreate, closeForm: () => void) => void
  editDefinition: (definitionId: string, data: DefinitionToCreate, closeForm: () => void) => void
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
