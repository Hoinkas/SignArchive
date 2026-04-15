import type { ISignDetails } from '@src/models/sign.model'
import type { ISourceDetails, ISourceWithDetailsToDB } from '@src/models/source.model'
import { createContext } from 'react'

export interface SourcesContextValue {
  sources: ISourceDetails[]
  addSource: (data: ISourceWithDetailsToDB, closeForm: () => void) => void
  editSource: (
    sourceId: string,
    updatedSource: Partial<ISourceWithDetailsToDB>,
    closeForm: () => void
  ) => void
  deleteSource: (deleteId: string) => void
  sourcesPanelSign: ISignDetails | null
  changeSourcesPanelSign: (data: ISignDetails) => void
  closeSourcesPanelSign: () => void
  sourcesListLoading: boolean
}

export const SourcesContext = createContext<SourcesContextValue>({
  sources: [],
  addSource: () => {},
  editSource: () => {},
  deleteSource: () => {},
  sourcesPanelSign: null,
  changeSourcesPanelSign: () => {},
  closeSourcesPanelSign: () => {},
  sourcesListLoading: false
})
