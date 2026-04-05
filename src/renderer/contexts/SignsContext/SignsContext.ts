import { createContext } from 'react'
import { SignToDB, SignDetails, SignDetailsToDB } from '@shared/types'

export interface SignContextValue {
  signs: SignDetails[]
  initiateSigns: (wordId: string) => void
  addSign: (data: SignDetailsToDB, closeForm: () => void) => void
  editSign: (signId: string, updatedSign: SignToDB, closeForm: () => void) => void
  deleteSign: (deleteId: string) => void
  changeSourcesCountInSign: (action: 'add' | 'remove', signId: string) => void
  updateSignYears: (signId: string) => void
}

export const SignContext = createContext<SignContextValue>({
  signs: [],
  initiateSigns: () => {},
  addSign: () => {},
  editSign: () => {},
  deleteSign: () => {},
  changeSourcesCountInSign: () => {},
  updateSignYears: () => {}
})
