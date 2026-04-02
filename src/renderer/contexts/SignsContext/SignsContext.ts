import { createContext } from 'react'
import { SignToDB, SignWithDetails, SignWithDetailsToDB } from '@shared/types'

export interface SignContextValue {
  signs: SignWithDetails[]
  initiateSigns: (wordId: string) => void
  addSign: (data: SignWithDetailsToDB, closeForm: () => void) => void
  editSign: (signId: string, updatedSign: SignToDB, closeForm: () => void) => void
  deleteSign: (deleteId: string) => void
  changeSourcesCountInSign: (action: 'add' | 'remove', signId: string) => void
}

export const SignContext = createContext<SignContextValue>({
  signs: [],
  initiateSigns: () => {},
  addSign: () => {},
  editSign: () => {},
  deleteSign: () => {},
  changeSourcesCountInSign: () => {}
})
