import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
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

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      signs: {
        list: (): Promise<Sign[]> => ipcRenderer.invoke('signs:list'),
        find: (id: string): Promise<Sign> => ipcRenderer.invoke('signs:find', id),
        create: (data: Omit<Sign, 'id' | 'createdAt'>): Promise<Sign> =>
          ipcRenderer.invoke('signs:create', data),
        update: (id: string, data: Partial<Sign>): Promise<Sign> =>
          ipcRenderer.invoke('signs:update', id, data),
        delete: (id: string): Promise<void> => ipcRenderer.invoke('signs:delete', id)
      },
      meanings: {
        list: (): Promise<Meaning[]> => ipcRenderer.invoke('meanings:list'),
        find: (id: string): Promise<Meaning> => ipcRenderer.invoke('meanings:find', id),
        by_sign: (signId: string): Promise<Meaning[]> =>
          ipcRenderer.invoke('meanings:by_sign', signId),
        by_word: (wordId: string): Promise<Meaning[]> =>
          ipcRenderer.invoke('meanings:by_word', wordId),
        create: (data: Omit<Meaning, 'id' | 'createdAt'>): Promise<Meaning> =>
          ipcRenderer.invoke('meanings:create', data),
        update: (id: string, data: Partial<Meaning>): Promise<Meaning> =>
          ipcRenderer.invoke('meanings:update', id, data),
        delete: (id: string): Promise<void> => ipcRenderer.invoke('meanings:delete', id)
      },
      words: {
        list: (): Promise<Word[]> => ipcRenderer.invoke('words:list'),
        list_full: (id: string): Promise<WordWithDetails> =>
          ipcRenderer.invoke('words:list_full', id),
        list_signs_count: (): Promise<WordWithSignCount[]> =>
          ipcRenderer.invoke('words:list_signs_count'),
        create: (data: Omit<Word, 'id' | 'createdAt'>): Promise<Word> =>
          ipcRenderer.invoke('words:create', data),
        update: (id: string, data: Partial<Word>): Promise<Word> =>
          ipcRenderer.invoke('words:update', id, data),
        delete: (id: string): Promise<void> => ipcRenderer.invoke('words:delete', id)
      },
      signers: {
        list: (): Promise<Signer[]> => ipcRenderer.invoke('signers:list'),
        create: (data: Omit<Signer, 'id' | 'createdAt'>): Promise<Signer> =>
          ipcRenderer.invoke('signers:create', data),
        delete: (id: string): Promise<void> => ipcRenderer.invoke('signers:delete', id)
      },
      sources: {
        list: (): Promise<Source[]> => ipcRenderer.invoke('sources:list'),
        create: (data: Omit<Source, 'id' | 'createdAt'>): Promise<Source> =>
          ipcRenderer.invoke('sources:create', data),
        delete: (id: string): Promise<void> => ipcRenderer.invoke('sources:delete', id)
      },
      media_files: {
        list: (): Promise<MediaFile[]> => ipcRenderer.invoke('media_files:list'),
        by_sign: (signId: string): Promise<MediaFile[]> =>
          ipcRenderer.invoke('media_files:by_sign', signId),
        create: (data: Omit<MediaFile, 'id' | 'createdAt'>): Promise<MediaFile> =>
          ipcRenderer.invoke('media_files:create', data),
        delete: (id: string): Promise<void> => ipcRenderer.invoke('media_files:delete', id)
      },
      signs_relations: {
        list: (): Promise<SignRelation[]> => ipcRenderer.invoke('signs_relations:list'),
        by_sign: (signId: string): Promise<SignRelation[]> =>
          ipcRenderer.invoke('signs_relations:by_sign', signId),
        create: (data: Omit<SignRelation, 'createdAt'>): Promise<SignRelation> =>
          ipcRenderer.invoke('signs_relations:create', data),
        delete: (tailSignId: string, headSignId: string): Promise<void> =>
          ipcRenderer.invoke('signs_relations:delete', tailSignId, headSignId)
      }
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
