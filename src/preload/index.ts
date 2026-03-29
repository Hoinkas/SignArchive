import { contextBridge, ipcRenderer, webUtils } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type {
  MediaFile,
  Meaning,
  Sign,
  Signer,
  Source,
  Word,
  WordToDB,
  SourceToDB,
  SignerToDB,
  MediaFileToDB,
  MeaningToDB,
  WordWithCounts,
  Author,
  AuthorToDB,
  WordWithMeaningsDetails,
  SignWithDetailsToDB,
  SignWithSourceDetails,
  SignToDB
} from '@shared/types'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      sign: {
        list: (): Promise<Sign[]> => ipcRenderer.invoke('sign:list'),
        find: (signId: string): Promise<Sign> => ipcRenderer.invoke('sign:find', signId),
        create: (data: SignWithDetailsToDB): Promise<SignWithSourceDetails> =>
          ipcRenderer.invoke('sign:create', data),
        update: (signId: string, data: Partial<SignToDB>): Promise<Meaning> =>
          ipcRenderer.invoke('sign:update', signId, data),
        delete: (signId: string): Promise<void> => ipcRenderer.invoke('sign:delete', signId)
      },
      meaning: {
        list: (): Promise<Meaning[]> => ipcRenderer.invoke('meaning:list'),
        find: (meaningId: string): Promise<Meaning> =>
          ipcRenderer.invoke('meaning:find', meaningId),
        create: (data: MeaningToDB): Promise<Meaning> => ipcRenderer.invoke('meaning:create', data),
        update: (meaningId: string, data: Partial<MeaningToDB>): Promise<Meaning> =>
          ipcRenderer.invoke('meaning:update', meaningId, data),
        delete: (meaningId: string): Promise<void> =>
          ipcRenderer.invoke('meaning:delete', meaningId)
      },
      word: {
        listWithCount: (): Promise<WordWithCounts[]> => ipcRenderer.invoke('word:listWithCount'),
        find: (wordId: string): Promise<Word> => ipcRenderer.invoke('word:find', wordId),
        details: (wordId: string): Promise<WordWithMeaningsDetails> =>
          ipcRenderer.invoke('word:details', wordId),
        create: (data: WordToDB): Promise<Word> => ipcRenderer.invoke('word:create', data),
        update: (wordId: string, data: Partial<Word>): Promise<Word> =>
          ipcRenderer.invoke('word:update', wordId, data),
        delete: (wordId: string): Promise<void> => ipcRenderer.invoke('word:delete', wordId)
      },
      signer: {
        list: (): Promise<Signer[]> => ipcRenderer.invoke('signer:list'),
        find: (signerId: string): Promise<Signer> => ipcRenderer.invoke('signer:find', signerId),
        create: (data: SignerToDB): Promise<Signer> => ipcRenderer.invoke('signer:create', data),
        delete: (signerId: string): Promise<void> => ipcRenderer.invoke('signer:delete', signerId)
      },
      source: {
        list: (): Promise<Source[]> => ipcRenderer.invoke('source:list'),
        find: (sourceId: string): Promise<Source> => ipcRenderer.invoke('source:find', sourceId),
        create: (data: SourceToDB): Promise<Source> => ipcRenderer.invoke('source:create', data),
        delete: (sourceId: string): Promise<void> => ipcRenderer.invoke('source:delete', sourceId)
      },
      mediaFile: {
        list: (): Promise<MediaFile[]> => ipcRenderer.invoke('mediaFile:list'),
        find: (mediaFileId: string): Promise<MediaFile[]> =>
          ipcRenderer.invoke('mediaFile:find', mediaFileId),
        create: (data: MediaFileToDB): Promise<MediaFile> =>
          ipcRenderer.invoke('mediaFile:create', data),
        delete: (mediaFileId: string): Promise<void> =>
          ipcRenderer.invoke('mediaFile:delete', mediaFileId)
      },
      author: {
        list: (): Promise<Author[]> => ipcRenderer.invoke('author:list'),
        find: (authorId: string): Promise<Author> => ipcRenderer.invoke('author:find', authorId),
        create: (data: AuthorToDB): Promise<Author> => ipcRenderer.invoke('author:create', data),
        delete: (authorId: string): Promise<void> => ipcRenderer.invoke('author:delete', authorId)
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
