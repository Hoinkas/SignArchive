import { createContext } from 'react'
import { SignWithDetails, SourceWithDetails, SourceWithDetailsToDB } from '@shared/types'

export interface SourcesContextValue {
  sources: SourceWithDetails[]
  addSource: (data: SourceWithDetailsToDB, closeForm: () => void) => void
  editSource: (
    sourceId: string,
    updatedSource: Partial<SourceWithDetailsToDB>,
    closeForm: () => void
  ) => void
  deleteSource: (deleteId: string) => void
  sourcesPanelSign: SignWithDetails | null
  changeSourcesPanelSign: (data: SignWithDetails) => void
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
