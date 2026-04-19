import type { IMeaningAttached, IMeaningDetails, IMeaningToDB } from '@src/models/meaning.model'
import { createContext } from 'react'

export interface MeaningListContextValue {
  meaningList: IMeaningDetails[]
  meaningListLoading: boolean
  addMeaning: (data: IMeaningToDB, closeForm: () => void) => void
  editMeaning: (meaningId: string, meaningChanges: Partial<IMeaningAttached>, closeForm: () => void) => void
  deleteMeaning: (deleteId: string) => void
}

export const MeaningListContext = createContext<MeaningListContextValue>({
  meaningList: [],
  meaningListLoading: false,
  addMeaning: () => {},
  editMeaning: () => {},
  deleteMeaning: () => {}
})
