import type {
  MediaFile,
  Meaning,
  Sign,
  Signer,
  SignRelation,
  Source,
  Word,
  WordWithDetails,
  WordWithSignCount
} from '@shared/types'

/// <reference types="vite/client" />

declare global {
  interface Window {
    api: {
      signs: {
        list: () => Promise<Sign[]>
        find: (id: string) => Promise<Sign>
        create: (data: Omit<Sign, 'id' | 'createdAt'>) => Promise<Sign>
        update: (id: string, data: Partial<Sign>) => Promise<Sign>
        delete: (id: string) => Promise<void>
      }
      meanings: {
        list: () => Promise<Meaning[]>
        find: (id: string) => Promise<Meaning>
        by_sign: (signId: string) => Promise<Meaning[]>
        by_word: (wordId: string) => Promise<Meaning[]>
        create: (data: Omit<Meaning, 'id' | 'createdAt'>) => Promise<Meaning>
        update: (id: string, data: Partial<Meaning>) => Promise<Meaning>
        delete: (id: string) => Promise<void>
      }
      words: {
        list: () => Promise<Word[]>
        list_full: (id: string) => Promise<WordWithDetails>
        list_signs_count: () => Promise<WordWithSignCount[]>
        create: (data: Omit<Word, 'id' | 'createdAt'>) => Promise<Word>
        update: (id: string, data: Partial<Word>) => Promise<Word>
        delete: (id: string) => Promise<void>
      }
      signers: {
        list: () => Promise<Signer[]>
        create: (data: Omit<Signer, 'id' | 'createdAt'>) => Promise<Signer>
        delete: (id: string) => Promise<void>
      }
      sources: {
        list: () => Promise<Source[]>
        create: (data: Omit<Source, 'id' | 'createdAt'>) => Promise<Source>
        delete: (id: string) => Promise<void>
      }
      media_files: {
        list: () => Promise<MediaFile[]>
        by_sign: (signId: string) => Promise<MediaFile[]>
        create: (data: Omit<MediaFile, 'id' | 'createdAt'>) => Promise<MediaFile>
        delete: (id: string) => Promise<void>
      }
      signs_relations: {
        list: () => Promise<SignRelation[]>
        by_sign: (signId: string) => Promise<SignRelation[]>
        create: (data: Omit<SignRelation, 'createdAt'>) => Promise<SignRelation>
        delete: (tailSignId: string, headSignId: string) => Promise<void>
      }
    }
  }
}
