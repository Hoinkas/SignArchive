import type { DropdownOption } from '@src/components/Form/Components/DropdownOptions'
import type { IMeaningAttached, IMeaningDetails, IMeaningToDB } from '@src/models/meaning.model'
import { createContext } from 'react'

export interface MeaningListContextValue {
  meaningList: IMeaningDetails[]
  meaningListLoading: boolean
  addMeaning: (data: IMeaningToDB, words: DropdownOption[], closeForm: () => void) => void
  editMeaning: (meaningId: string, meaningChanges: Partial<IMeaningAttached>, oldWords: DropdownOption[], newWords: DropdownOption[], closeForm: () => void) => void
  deleteMeaning: (deleteId: string) => void
}

export const MeaningListContext = createContext<MeaningListContextValue>({
  meaningList: [],
  meaningListLoading: false,
  addMeaning: () => {},
  editMeaning: () => {},
  deleteMeaning: () => {}
})
