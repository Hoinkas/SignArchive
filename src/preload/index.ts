import { contextBridge, ipcRenderer, webUtils } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type {
  Word,
  WordToDB,
  WordWithCountCategories,
  Author,
  SignDetails,
  SignDetailsToDB,
  SignToDB,
  Sign,
  SourceDetails,
  SourceWithDetailsToDB,
  DefinitionToDB,
  Definition,
  Tag,
  TagToDB,
  YearStartEnd
} from '@shared/types'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      sign: {
        list: (wordId: string): Promise<SignDetails[]> => ipcRenderer.invoke('sign:list', wordId),
        create: (data: SignDetailsToDB): Promise<SignDetails> =>
          ipcRenderer.invoke('sign:create', data),
        update: (signId: string, data: Partial<SignToDB>): Promise<Sign> =>
          ipcRenderer.invoke('sign:update', signId, data),
        delete: (signId: string): Promise<void> => ipcRenderer.invoke('sign:delete', signId),
        years: (signId: string, wordId: string): Promise<YearStartEnd> =>
          ipcRenderer.invoke('sign:years', signId, wordId)
      },
      word: {
        listWithCount: (): Promise<WordWithCountCategories[]> =>
          ipcRenderer.invoke('word:listWithCount'),
        details: (wordId: string): Promise<Word> => ipcRenderer.invoke('word:details', wordId),
        create: (data: WordToDB): Promise<Word> => ipcRenderer.invoke('word:create', data),
        update: (wordId: string, data: Partial<WordToDB>): Promise<Word | undefined> =>
          ipcRenderer.invoke('word:update', wordId, data),
        delete: (wordId: string): Promise<void> => ipcRenderer.invoke('word:delete', wordId)
      },
      source: {
        list: (signId: string, wordId: string): Promise<SourceDetails[]> =>
          ipcRenderer.invoke('source:list', signId, wordId),
        details: (sourceId: string): Promise<SourceDetails> =>
          ipcRenderer.invoke('source:details', sourceId),
        create: (data: SourceWithDetailsToDB): Promise<SourceDetails> =>
          ipcRenderer.invoke('source:create', data),
        update: (
          sourceId: string,
          data: Partial<SourceWithDetailsToDB>
        ): Promise<SourceDetails | undefined> =>
          ipcRenderer.invoke('source:update', sourceId, data),
        delete: (sourceId: string): Promise<void> => ipcRenderer.invoke('source:delete', sourceId)
      },
      author: {
        list: (): Promise<Author[]> => ipcRenderer.invoke('author:list')
      },
      definition: {
        create: (data: DefinitionToDB): Promise<Definition> =>
          ipcRenderer.invoke('definition:create', data),
        update: (
          definitionId: string,
          data: Partial<DefinitionToDB>
        ): Promise<Definition | undefined> =>
          ipcRenderer.invoke('definition:update', definitionId, data),
        delete: (definitionId: string): Promise<void> =>
          ipcRenderer.invoke('definition:delete', definitionId)
      },
      tag: {
        list: (): Promise<Tag[]> => ipcRenderer.invoke('tag:list'),
        listByWordId: (wordId: string): Promise<Tag[]> =>
          ipcRenderer.invoke('tag:listByWordId', wordId),
        create: (wordId: string, data: TagToDB): Promise<Tag> =>
          ipcRenderer.invoke('tag:create', wordId, data),
        delete: (tagId: string): Promise<void> => ipcRenderer.invoke('tag:delete', tagId)
      },
      getPathForFile: (file: File): string => webUtils.getPathForFile(file)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = {}
}
