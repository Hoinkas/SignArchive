import { createContext } from 'react'
import { SignDetails, SourceDetails, SourceWithDetailsToDB } from '@shared/types'

export interface SourcesContextValue {
  sources: SourceDetails[]
  addSource: (data: SourceWithDetailsToDB, closeForm: () => void) => void
  editSource: (
    sourceId: string,
    updatedSource: Partial<SourceWithDetailsToDB>,
    closeForm: () => void
  ) => void
  deleteSource: (deleteId: string) => void
  sourcesPanelSign: SignDetails | null
  changeSourcesPanelSign: (data: SignDetails) => void
  closeSourcesPanelSign: () => void
}

export const SourcesContext = createContext<SourcesContextValue>({
  sources: [],
  addSource: () => {},
  editSource: () => {},
  deleteSource: () => {},
  sourcesPanelSign: null,
  changeSourcesPanelSign: () => {},
  closeSourcesPanelSign: () => {}
})
