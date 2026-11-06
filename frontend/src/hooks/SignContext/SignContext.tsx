import type { ISignDetailed } from '@src/models/sign.model'
import type { IWordAttached } from '@src/models/word.model'
import { createContext } from 'react'

export interface SignContextValue {
  sign: ISignDetailed | null
  signLoading: boolean
  openCloseSidePanel: (uniqueNumber: string) => void
  words: IWordAttached[]
//   addSignAndMedia: (data: ISignDetailsToDB, media: IMediaToDB, closeForm: () => void) => void
//   editSignAndMedia: (signId: string, signChanges: Partial<ISignDetailsToDB>, mediaChanges: Partial<IMediaToDB>, closeForm: () => void) => void
//   deleteSignAndMedia: (deleteId: string) => void
//   addMeaning: (data: IMeaningToDB, words: DropdownOption[], closeForm: () => void) => void
//   editMeaning: (meaningId: string, meaningChanges: Partial<IMeaningAttached>, oldWords: DropdownOption[], newWords: DropdownOption[], closeForm: () => void) => void
//   deleteMeaning: (deleteId: string) => void
//   addSource: (meaningId: string, data: ISourceWithDetailsToDB, regions: DropdownOption[], closeForm: () => void) => void
//   editSource: (meaningId: string, sourceId: string, sourceChanges: Partial<ISourceDetails>, oldRegions: DropdownOption[], newRegions: DropdownOption[], closeForm: () => void) => void
//   deleteSource: (meaningId: string, sourceId: string) => void
}

export const SignContext = createContext<SignContextValue>({
  sign: null,
  signLoading: false,
  openCloseSidePanel: () => {},
  words: [],
//   addSignAndMedia: () => {},
//   editSignAndMedia: () => {},
//   deleteSignAndMedia: () => {},
//   addMeaning: () => {},
//   editMeaning: () => {},
//   deleteMeaning: () => {},
//   addSource: () => {},
//   editSource: () => {},
//   deleteSource: () => {}
})
