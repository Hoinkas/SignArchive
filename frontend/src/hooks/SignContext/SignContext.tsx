import type { ISignDetails, ISignDetailsToDB } from '@src/models/sign.model'
import { createContext } from 'react'

export interface SignContextValue {
  sign: ISignDetails | null
  signLoading: boolean
  initiateSign: (signId: string) => void
  addSign: (data: ISignDetailsToDB, closeForm: () => void) => void
  editSign: (signId: string, updatedSign: Partial<ISignDetails>, closeForm: () => void) => void
  deleteSign: (deleteId: string) => void
}

export const SignContext = createContext<SignContextValue>({
  sign: null,
  signLoading: false,
  initiateSign: () => {},
  addSign: () => {},
  editSign: () => {},
  deleteSign: () => {}
})
