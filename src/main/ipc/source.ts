import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Source, SourceToDB, SourceWithSignerAuthorMediaFile } from '@shared/types'
import { toSqlParams } from '../db/utils'
import { findSignerById } from './signer'
import { findAuthorById } from './author'
import { findMediaFileById } from './mediaFile'

export function listAllSources(): Source[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM source ORDER BY name').all()
  return rows as Source[]
}

export function findSourceById(id: string): Source | undefined {
  const row = getDb().prepare('SELECT * FROM source WHERE id = ?').get(id)
  return row as Source | undefined
}

export function returnSourceDetailsById(
  sourceId: string
): SourceWithSignerAuthorMediaFile | undefined {
  const source = findSourceById(sourceId)
  if (!source) return

  return {
    ...source,
    signer: findSignerById(source.signerId),
    author: findAuthorById(source.authorId),
    mediaFile: findMediaFileById(source.mediaFileId)
  }
}

export function createSource(data: SourceToDB): Source {
  const db = getDb()
  const source: Source = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO source (id, createdAt, signerId, authorId, mediaFileId, region, yearStart, yearEnd, notes)
    VALUES (@id, @createdAt, @signerId, @authorId, @mediaFileId, @region, @yearStart, @yearEnd, @notes)
  `
  ).run(toSqlParams(source))
  return source
}

export function deleteSourceById(id: string): void {
  getDb().prepare('DELETE FROM source WHERE id = ?').run(id)
}

export function registerSourceHandlers(): void {
  ipcMain.handle('source:list', () => listAllSources())
  ipcMain.handle('source:find', (_e, id: string) => findSourceById(id))
  ipcMain.handle('source:create', (_e, data: SourceToDB) => createSource(data))
  ipcMain.handle('source:delete', (_e, id: string) => deleteSourceById(id))
}
