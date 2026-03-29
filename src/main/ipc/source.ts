import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type {
  Source,
  SourceToDB,
  SourceWithSignerAuthorMediaFile,
  YearStartEnd
} from '@shared/types'
import { toSqlParams } from '../utils/toSqlParams'
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

export function findMainSourceBySignId(signId: string): Source | undefined {
  const row = getDb()
    .prepare(
      `
      SELECT * FROM source
      INNER JOIN sourceSign ON source.id = sourceSign.sourceId
      WHERE sourceSign.signId = ? AND sourceSign.isMainSource = 1
    `
    )
    .get(signId)

  if (!row) return

  return row as Source
}

export function getSourcesStartEndYearBySignId(signId: string): YearStartEnd {
  const row = getDb()
    .prepare(
      `
      SELECT MIN(source.yearStart) AS yearStart, MAX(source.yearEnd) AS yearEnd
      FROM source
      INNER JOIN sourceSign ON source.id = sourceSign.sourceId
      WHERE sourceSign.signId = ?
    `
    )
    .get(signId)
  return row as YearStartEnd
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
  ipcMain.handle('source:find', (_, id: string) => findSourceById(id))
  ipcMain.handle('source:create', (_, data: SourceToDB) => createSource(data))
  ipcMain.handle('source:delete', (_, id: string) => deleteSourceById(id))
}
