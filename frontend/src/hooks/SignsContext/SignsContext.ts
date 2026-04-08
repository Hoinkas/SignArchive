import type { ISign, ISignDetails, ISignDetailsToDB } from '@src/models/sign.model'
import { createContext } from 'react'

export interface SignContextValue {
  signs: ISignDetails[]
  initiateSigns: (wordId: string) => void
  addSign: (data: ISignDetailsToDB, closeForm: () => void) => void
  editSign: (signId: string, updatedSign: ISign, closeForm: () => void) => void
  deleteSign: (deleteId: string) => void
  updateSignSource: (signId: string, action?: 'add' | 'delete') => void
}

export const SignContext = createContext<SignContextValue>({
  signs: [],
  initiateSigns: () => {},
  addSign: () => {},
  editSign: () => {},
  deleteSign: () => {},
  updateSignSource: () => {}
})
