import type { ISignSimple } from '@src/models/sign.model'
import { createContext } from 'react'

export interface SignListContextValue {
  signList: ISignSimple[]
  signListLoading: boolean
  initiateSigns: () => void
}

export const SignListContext = createContext<SignListContextValue>({
  signList: [],
  signListLoading: false,
  initiateSigns: () => {}
})
