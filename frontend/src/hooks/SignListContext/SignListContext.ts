import type { ISignSimple } from '@src/models/sign.model'
import { createContext } from 'react'

export interface SignListContextValue {
  signList: ISignSimple[]
  signListLoading: boolean
}

export const SignListContext = createContext<SignListContextValue>({
  signList: [],
  signListLoading: false,
})
