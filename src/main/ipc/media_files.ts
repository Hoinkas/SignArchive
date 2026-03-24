import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { MediaFile } from '@shared/types'
import { toSqlParams } from '../db/utils'

export function listAllMediaFiles(): MediaFile[] {
  const rows = getDb().prepare('SELECT * FROM media_files ORDER BY created_at DESC').all()
  return rows.map(rowToMediaFile)
}

export function findMediaFileById(id: string): MediaFile | undefined {
  const row = getDb().prepare('SELECT * FROM media_files WHERE id = ?').get(id)
  if (!row) return undefined
  return rowToMediaFile(row as Record<string, unknown>)
}

export function findMediaFilesBySignId(signId: string): MediaFile[] {
  const rows = getDb().prepare('SELECT * FROM media_files WHERE sign_id = ?').all(signId)
  return rows.map(rowToMediaFile)
}

export function findPrimaryMediaFileBySignId(signId: string): MediaFile | undefined {
  const row = getDb()
    .prepare(
      `
      SELECT * FROM media_files WHERE sign_id = ? AND is_primary = 1 LIMIT 1
    `
    )
    .get(signId)
  if (!row) return undefined
  return rowToMediaFile(row as Record<string, unknown>)
}

export function createMediaFile(data: Omit<MediaFile, 'id' | 'createdAt'>): MediaFile {
  const db = getDb()
  const mediaFile: MediaFile = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO media_files (id, created_at, sign_id, file_type, file_path, online_url, signer_id, source_id, is_primary, year)
    VALUES (@id, @createdAt, @signId, @fileType, @filePath, @onlineUrl, @signerId, @sourceId, @isPrimary, @year)
  `
  ).run(toSqlParams(mediaFile))
  return mediaFile
}

export function deleteMediaFileById(id: string): void {
  getDb().prepare('DELETE FROM media_files WHERE id = ?').run(id)
}

export function registerMediaFileHandlers(): void {
  ipcMain.handle('media_files:list', () => listAllMediaFiles())
  ipcMain.handle('media_files:by_sign', (_e, signId: string) => findMediaFilesBySignId(signId))
  ipcMain.handle('media_files:primary_by_sign', (_e, signId: string) =>
    findPrimaryMediaFileBySignId(signId)
  )
  ipcMain.handle('media_files:create', (_e, data: Omit<MediaFile, 'id' | 'createdAt'>) =>
    createMediaFile(data)
  )
  ipcMain.handle('media_files:delete', (_e, id: string) => deleteMediaFileById(id))
}

export function rowToMediaFile(row: Record<string, unknown>): MediaFile {
  return {
    id: row.id as string,
    createdAt: row.created_at as string,
    signId: row.sign_id as string,
    fileType: row.file_type as MediaFile['fileType'],
    filePath: row.file_path as string,
    onlineUrl: row.online_url as string | undefined,
    signerId: row.signer_id as string | undefined,
    sourceId: row.source_id as string | undefined,
    isPrimary: row.is_primary as number | undefined,
    year: row.year as number | undefined
  }
}
