import type { ISignDetailsEdit, ISignDetails, ISignDetailsToDB } from '@src/models/sign.model'
import type { IYearsRegions } from '@src/models/yearStartEnd.model'
import { createContext } from 'react'

export interface SignContextValue {
  signs: ISignDetails[]
  initiateSigns: (wordId: string) => void
  addSign: (data: ISignDetailsToDB, closeForm: () => void) => void
  editSign: (signId: string, updatedSign: ISignDetailsEdit, closeForm: () => void) => void
  deleteSign: (deleteId: string) => void
  updateSignSource: (signId: string, years: IYearsRegions, action?: 'add' | 'delete') => void
  loadSigns: boolean
}

export const SignContext = createContext<SignContextValue>({
  signs: [],
  initiateSigns: () => {},
  addSign: () => {},
  editSign: () => {},
  deleteSign: () => {},
  updateSignSource: () => {},
  loadSigns: false
})
