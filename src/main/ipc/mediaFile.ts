import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { MediaFile, MediaFileToDB } from '@shared/types'
import { toSqlParams } from '../utils/toSqlParams'

export function listAllMediaFiles(): MediaFile[] {
  const rows = getDb().prepare('SELECT * FROM mediaFile ORDER BY createdAt DESC').all()
  return rows as MediaFile[]
}

export function findMediaFileById(id: string): MediaFile | undefined {
  const row = getDb().prepare('SELECT * FROM mediaFile WHERE id = ?').get(id)
  return row as MediaFile | undefined
}

export function createMediaFile(data: MediaFileToDB): MediaFile {
  const db = getDb()
  const mediaFile: MediaFile = {
    id: nanoid(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO mediaFile (id, createDate, fileType, filePath)
    VALUES (@id, @createDate, @fileType, @filePath)
  `
  ).run(toSqlParams(mediaFile))
  return mediaFile
}

export function deleteMediaFileById(id: string): void {
  getDb().prepare('DELETE FROM mediaFile WHERE id = ?').run(id)
}

export function registerMediaFileHandlers(): void {
  ipcMain.handle('mediaFile:list', () => listAllMediaFiles())
  ipcMain.handle('mediaFile:find', (_, signId: string) => findMediaFileById(signId))
  ipcMain.handle('mediaFile:create', (_, data: MediaFileToDB) => createMediaFile(data))
  ipcMain.handle('mediaFile:delete', (_, id: string) => deleteMediaFileById(id))
}
