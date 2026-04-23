import type { DropdownOption } from '@src/components/Form/Components/DropdownOptions'
import type { IMeaningAttached, IMeaningToDB } from '@src/models/meaning.model'
import type { IMediaToDB } from '@src/models/media.model'
import type { ISignDetails, ISignDetailsToDB, ISignSimple } from '@src/models/sign.model'
import type { ISourceWithDetailsToDB, ISourceDetails } from '@src/models/source.model'
import { createContext } from 'react'

export interface SignContextValue {
  sign: ISignDetails | null
  simpleSign: ISignSimple | null
  signLoading: boolean
  openCloseSidePanel: (signId: string) => void
  addSignAndMedia: (data: ISignDetailsToDB, media: IMediaToDB, closeForm: () => void) => void
  editSignAndMedia: (signId: string, signChanges: Partial<ISignDetailsToDB>, mediaChanges: Partial<IMediaToDB>, closeForm: () => void) => void
  deleteSignAndMedia: (deleteId: string) => void
  addMeaning: (data: IMeaningToDB, words: DropdownOption[], closeForm: () => void) => void
  editMeaning: (meaningId: string, meaningChanges: Partial<IMeaningAttached>, oldWords: DropdownOption[], newWords: DropdownOption[], closeForm: () => void) => void
  deleteMeaning: (deleteId: string) => void
  addSource: (meaningId: string, data: ISourceWithDetailsToDB, regions: DropdownOption[], closeForm: () => void) => void
  editSource: (meaningId: string, sourceId: string, sourceChanges: Partial<ISourceDetails>, oldRegions: DropdownOption[], newRegions: DropdownOption[], closeForm: () => void) => void
  deleteSource: (meaningId: string, sourceId: string) => void
}

export const SignContext = createContext<SignContextValue>({
  sign: null,
  simpleSign: null,
  signLoading: false,
  openCloseSidePanel: () => {},
  addSignAndMedia: () => {},
  editSignAndMedia: () => {},
  deleteSignAndMedia: () => {},
  addMeaning: () => {},
  editMeaning: () => {},
  deleteMeaning: () => {},
  addSource: () => {},
  editSource: () => {},
  deleteSource: () => {}
})
