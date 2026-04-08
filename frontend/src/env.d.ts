import type { IDefinition, IWordAttached, IWord, IYearsRegions } from '@shared/types'

/// <reference types="vite/client" />

declare global {
  interface Window {
    api: {
      sign: {
        list: (wordId: string) => Promise<ISignDetails[]>
        create: (data: ISignDetailsToDB) => Promise<ISignDetails>
        update: (signId: string, data: Partial<ISign>) => Promise<Sign>
        delete: (signId: string) => Promise<void>
        yearsRegions: (signId: string, wordId: string) => Promise<IYearsRegions>
      }
      word: {
        listWithCount: () => Promise<IWordWithRegionsCategories[]>
        details: (wordId: string) => Promise<IWordAttached>
        create: (data: IWord) => Promise<IWordAttached>
        update: (wordId: string, data: Partial<IWord>) => Promise<IWordAttached | undefined>
        delete: (wordId: string) => Promise<void>
      }
      source: {
        list: (signId: string, wordId: string) => Promise<ISourceDetails[]>
        details: (sourceId: string) => Promise<SourceWithSignerAuthorMediaFile>
        regions: () => Promise<string[]>
        update: (
          sourceId: string,
          data: Partial<ISourceWithDetailsToDB>
        ) => Promise<ISourceDetails | undefined>
        create: (data: ISourceWithDetailsToDB) => Promise<ISourceDetails>
        delete: (sourceId: string) => Promise<void>
      }
      author: {
        list: () => Promise<IAuthorAttached[]>
      }
      definition: {
        create: (data: IDefinition) => Promise<IDefinitionAttached>
        update: (
          definitionId: string,
          data: Partial<IDefinition>
        ) => Promise<IDefinitionAttached | undefined>
        delete: (definitionId: string) => Promise<void>
      }
      tag: {
        list: () => Promise<ITagAttached[]>
        listByWordId: (wordId: string) => Promise<ITagAttached[]>
        create: (wordId: string, data: ITag) => Promise<Tag>
      }
      getPathForFile: (file: File) => string
    }
  }
}
