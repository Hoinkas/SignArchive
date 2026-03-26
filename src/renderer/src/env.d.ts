import type {
  MediaFile,
  Meaning,
  Sign,
  Signer,
  Source,
  Word,
  SignToDB,
  MeaningToDB,
  WordToDB,
  SourceToDB,
  MediaFileToDB,
  AuthorToDB
} from '@shared/types'

/// <reference types="vite/client" />

declare global {
  interface Window {
    api: {
      sign: {
        list: () => Promise<Sign[]>
        find: (signId: string) => Promise<Sign>
        create: (data: SignToDB) => Promise<Sign>
        delete: (signId: string) => Promise<void>
      }
      meaning: {
        list: () => Promise<Meaning[]>
        find: (meaningId: string) => Promise<Meaning>
        create: (data: MeaningToDB) => Promise<Meaning>
        update: (meaningId: string, data: Partial<MeaningToDB>) => Promise<Meaning>
        delete: (meaningId: string) => Promise<void>
      }
      word: {
        listWithCount: () => Promise<WordWithCounts[]>
        details: (wordId: string) => Promise<WordWithMeaningsDetails>
        find: (wordId: string) => Promise<Meaning>
        create: (data: WordToDB) => Promise<Word>
        update: (wordId: string, data: Partial<WordToDB>) => Promise<Word>
        delete: (wordId: string) => Promise<void>
      }
      signer: {
        list: () => Promise<Signer[]>
        find: (signerId: string) => Promise<Signer>
        create: (data: SignToDB) => Promise<Signer>
        delete: (signerId) => Promise<void>
      }
      source: {
        list: () => Promise<Source[]>
        find: (sourceId: string) => Promise<Source>
        create: (data: SourceToDB) => Promise<Source>
        delete: (sourceId: string) => Promise<void>
      }
      mediaFile: {
        list: () => Promise<MediaFile[]>
        find: (mediaFileId: string) => Promise<MediaFile>
        create: (data: MediaFileToDB) => Promise<MediaFile>
        delete: (mediaFileId: string) => Promise<void>
      }
      author: {
        list: () => Promise<Author[]>
        find: (authorId: string) => Promise<Author>
        create: (data: AuthorToDB) => Promise<Author>
        delete: (authorId: string) => Promise<void>
      }
    }
  }
}
