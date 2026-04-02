import type { Word, WordToDB } from '@shared/types'

/// <reference types="vite/client" />

declare global {
  interface Window {
    api: {
      sign: {
        list: (wordId: string) => Promise<SignWithDetails[]>
        create: (data: SignWithDetailsToDB) => Promise<SignWithDetails>
        update: (signId: string, data: Partial<SignToDB>) => Promise<Sign>
        delete: (signId: string) => Promise<void>
      }
      word: {
        listWithCount: () => Promise<WordWithCounts[]>
        details: (wordId: string) => Promise<Word>
        create: (data: WordToDB) => Promise<Word>
        update: (wordId: string, data: Partial<WordToDB>) => Promise<Word | undefined>
        delete: (wordId: string) => Promise<void>
      }
      source: {
        list: (signId: string, wordId: string) => Promise<SourceWithDetails[]>
        details: (sourceId: string) => Promise<SourceWithSignerAuthorMediaFile>
        update: (
          sourceId: string,
          data: Partial<SourceWithDetailsToDB>
        ) => Promise<SourceWithDetails | undefined>
        create: (data: SourceWithDetailsToDB) => Promise<SourceWithDetails>
        delete: (sourceId: string) => Promise<void>
      }
      author: {
        list: () => Promise<Author[]>
      }
      getPathForFile: (file: File) => string
    }
  }
}
