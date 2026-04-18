import type { ISignSimple } from '@src/models/sign.model'
import { createContext } from 'react'

export interface SignContextValue {
  signList: ISignSimple[]
  signListLoading: boolean
  initiateSigns: () => void
}

export const SignContext = createContext<SignContextValue>({
  signList: [],
  signListLoading: false,
  initiateSigns: () => {}
})
