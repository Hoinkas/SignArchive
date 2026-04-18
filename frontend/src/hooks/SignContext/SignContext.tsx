import type { IMediaToDB } from '@src/models/media.model'
import type { ISignDetails, ISignDetailsToDB } from '@src/models/sign.model'
import { createContext } from 'react'

export interface SignContextValue {
  sign: ISignDetails | null
  signLoading: boolean
  initiateSign: (signId: string) => void
  addSignAndMedia: (data: ISignDetailsToDB, media: IMediaToDB, closeForm: () => void) => void
  editSignAndMedia: (signId: string, signChanges: Partial<ISignDetailsToDB>, mediaChanges: Partial<IMediaToDB>, closeForm: () => void) => void
  deleteSignAndMedia: (deleteId: string) => void
}

export const SignContext = createContext<SignContextValue>({
  sign: null,
  signLoading: false,
  initiateSign: () => {},
  addSignAndMedia: () => {},
  editSignAndMedia: () => {},
  deleteSignAndMedia: () => {}
})
