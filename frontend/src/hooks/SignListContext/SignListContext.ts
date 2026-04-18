import type { ISignSimple } from '@src/models/sign.model'
import { createContext } from 'react'

export interface SignListContextValue {
  signList: ISignSimple[]
  signListLoading: boolean
  addSignToSignList: (data: ISignSimple) => void
  editSignInSignList: (data: ISignSimple) => void
  deleteSignFromSignList: (signId: string) => void
}

export const SignListContext = createContext<SignListContextValue>({
  signList: [],
  signListLoading: false,
  addSignToSignList: () => {},
  editSignInSignList: () => {},
  deleteSignFromSignList: () => {}
})
