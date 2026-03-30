import { contextBridge, ipcRenderer, webUtils } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type {
  Meaning,
  Signer,
  Word,
  WordToDB,
  MeaningToDB,
  WordWithCounts,
  Author,
  WordWithMeaningsDetails,
  SignWithDetailsToDB,
  SignWithSourceDetails,
  SignToDB,
  SourceWithSignerAuthorMediaFile
} from '@shared/types'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      sign: {
        create: (data: SignWithDetailsToDB): Promise<SignWithSourceDetails> =>
          ipcRenderer.invoke('sign:create', data),
        update: (signId: string, data: Partial<SignToDB>): Promise<Meaning> =>
          ipcRenderer.invoke('sign:update', signId, data),
        delete: (signId: string): Promise<void> => ipcRenderer.invoke('sign:delete', signId)
      },
      meaning: {
        create: (data: MeaningToDB): Promise<Meaning> => ipcRenderer.invoke('meaning:create', data),
        update: (meaningId: string, data: Partial<MeaningToDB>): Promise<Meaning> =>
          ipcRenderer.invoke('meaning:update', meaningId, data),
        delete: (meaningId: string): Promise<void> =>
          ipcRenderer.invoke('meaning:delete', meaningId)
      },
      word: {
        listWithCount: (): Promise<WordWithCounts[]> => ipcRenderer.invoke('word:listWithCount'),
        details: (wordId: string): Promise<WordWithMeaningsDetails> =>
          ipcRenderer.invoke('word:details', wordId),
        create: (data: WordToDB): Promise<Word> => ipcRenderer.invoke('word:create', data),
        update: (wordId: string, data: Partial<Word>): Promise<Word> =>
          ipcRenderer.invoke('word:update', wordId, data),
        delete: (wordId: string): Promise<void> => ipcRenderer.invoke('word:delete', wordId)
      },
      signer: {
        list: (): Promise<Signer[]> => ipcRenderer.invoke('signer:list')
      },
      source: {
        list: (signId: string): Promise<SourceWithSignerAuthorMediaFile[]> =>
          ipcRenderer.invoke('source:list', signId)
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
