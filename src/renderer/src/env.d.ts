import type {
  Meaning,
  Sign,
  Signer,
  Source,
  Word,
  SignToDB,
  MeaningToDB,
  WordToDB
} from '@shared/types'

/// <reference types="vite/client" />

declare global {
  interface Window {
    api: {
      sign: {
        create: (data: SignWithDetailsToDB) => Promise<SignWithSourceDetails>
        update: (signId: string, data: Partial<SignToDB>) => Promise<Sign>
        delete: (signId: string) => Promise<void>
      }
      meaning: {
        create: (data: MeaningToDB) => Promise<Meaning>
        update: (meaningId: string, data: Partial<MeaningToDB>) => Promise<Meaning>
        delete: (meaningId: string) => Promise<void>
      }
      word: {
        listWithCount: () => Promise<WordWithCounts[]>
        details: (wordId: string) => Promise<WordWithMeaningsDetails>
        create: (data: WordToDB) => Promise<Word>
        update: (wordId: string, data: Partial<WordToDB>) => Promise<Word>
        delete: (wordId: string) => Promise<void>
      }
      signer: {
        list: () => Promise<Signer[]>
      }
      source: {
        list: (signId: string) => Promise<SourceWithSignerAuthorMediaFile[]>
      }
      author: {
        list: () => Promise<Author[]>
      }
      getPathForFile: (file: File) => string
    }
  }
}
