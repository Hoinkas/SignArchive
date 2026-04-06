import type { DefinitionToDB, Word, WordToDB, YearsRegions } from '@shared/types'

/// <reference types="vite/client" />

declare global {
  interface Window {
    api: {
      sign: {
        list: (wordId: string) => Promise<SignDetails[]>
        create: (data: SignDetailsToDB) => Promise<SignDetails>
        update: (signId: string, data: Partial<SignToDB>) => Promise<Sign>
        delete: (signId: string) => Promise<void>
        yearsRegions: (signId: string, wordId: string) => Promise<YearsRegions>
      }
      word: {
        listWithCount: () => Promise<WordWithCountCategories[]>
        details: (wordId: string) => Promise<Word>
        create: (data: WordToDB) => Promise<Word>
        update: (wordId: string, data: Partial<WordToDB>) => Promise<Word | undefined>
        delete: (wordId: string) => Promise<void>
      }
      source: {
        list: (signId: string, wordId: string) => Promise<SourceDetails[]>
        details: (sourceId: string) => Promise<SourceWithSignerAuthorMediaFile>
        regions: () => Promise<string[]>
        update: (
          sourceId: string,
          data: Partial<SourceWithDetailsToDB>
        ) => Promise<SourceDetails | undefined>
        create: (data: SourceWithDetailsToDB) => Promise<SourceDetails>
        delete: (sourceId: string) => Promise<void>
      }
      author: {
        list: () => Promise<Author[]>
      }
      definition: {
        create: (data: DefinitionToDB) => Promise<Definition>
        update: (
          definitionId: string,
          data: Partial<DefinitionToDB>
        ) => Promise<Definition | undefined>
        delete: (definitionId: string) => Promise<void>
      }
      tag: {
        list: () => Promise<Tag[]>
        listByWordId: (wordId: string) => Promise<Tag[]>
        create: (wordId: string, data: TagToDB) => Promise<Tag>
        delete: (tagId: string) => Promise<void>
      }
      getPathForFile: (file: File) => string
    }
  }
}
