import { contextBridge, ipcRenderer, webUtils } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type {
  Word,
  WordToDB,
  WordWithCounts,
  Author,
  SignWithDetails,
  SignWithDetailsToDB,
  SignToDB,
  Sign,
  SourceWithDetails,
  SourceWithDetailsToDB
} from '@shared/types'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      sign: {
        list: (wordId: string): Promise<SignWithDetails[]> =>
          ipcRenderer.invoke('sign:list', wordId),
        create: (data: SignWithDetailsToDB): Promise<SignWithDetails> =>
          ipcRenderer.invoke('sign:create', data),
        update: (signId: string, data: Partial<SignToDB>): Promise<Sign> =>
          ipcRenderer.invoke('sign:update', signId, data),
        delete: (signId: string): Promise<void> => ipcRenderer.invoke('sign:delete', signId)
      },
      word: {
        listWithCount: (): Promise<WordWithCounts[]> => ipcRenderer.invoke('word:listWithCount'),
        details: (wordId: string): Promise<Word> => ipcRenderer.invoke('word:details', wordId),
        create: (data: WordToDB): Promise<Word> => ipcRenderer.invoke('word:create', data),
        update: (wordId: string, data: Partial<WordToDB>): Promise<Word | undefined> =>
          ipcRenderer.invoke('word:update', wordId, data),
        delete: (wordId: string): Promise<void> => ipcRenderer.invoke('word:delete', wordId)
      },
      source: {
        list: (signId: string, wordId: string): Promise<SourceWithDetails[]> =>
          ipcRenderer.invoke('source:list', signId, wordId),
        details: (sourceId: string): Promise<SourceWithDetails> =>
          ipcRenderer.invoke('source:details', sourceId),
        create: (data: SourceWithDetailsToDB): Promise<SourceWithDetails> =>
          ipcRenderer.invoke('source:create', data),
        update: (
          sourceId: string,
          data: Partial<SourceWithDetailsToDB>
        ): Promise<SourceWithDetails | undefined> =>
          ipcRenderer.invoke('source:update', sourceId, data),
        delete: (sourceId: string): Promise<void> => ipcRenderer.invoke('source:delete', sourceId)
      },
      author: {
        list: (): Promise<Author[]> => ipcRenderer.invoke('author:list')
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
