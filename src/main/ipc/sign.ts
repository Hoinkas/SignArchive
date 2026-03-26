import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Sign, SignToDB, SignWithSourcesDetails, SourceWithSignerAuthorMediaFile } from '@shared/types'
import { toSqlParams } from '../db/utils'
import { findSourcesIdsBySignId } from './sourceSign'
import { returnSourceDetailsById } from './source'

export function listAllSigns(): Sign[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM sign ORDER BY created_at DESC').all()
  return rows as Sign[]
}

export function findSignById(id: string): Sign | undefined {
  const row = getDb().prepare('SELECT * FROM sign WHERE id = ?').get(id)
  return row as Sign | undefined
}

export function returnSignsCountByWordId(wordId: string): number {
  const row = getDb().prepare(`
    SELECT COUNT(DISTINCT sign.id) AS count
    FROM sign
    INNER JOIN meaningSign ON sign.id = meaningSign.signId
    INNER JOIN meaning ON meaningSign.meaningId = meaning.id
    WHERE meaning.wordId = ?
    `).get(wordId)
  return row.count
}

export function returnSignDetailsById(signId: string): SignWithSourcesDetails | undefined {
  const sign = findSignById(signId)
  if (!sign) return

  const sourcesIds = findSourcesIdsBySignId(sign.id)
  const sources: SourceWithSignerAuthorMediaFile[] = []

  sourcesIds.forEach((sourceId) => {
    const sourceDetail = returnSourceDetailsById(sourceId)
    if (!sourceDetail) return
    sources.push(sourceDetail)
  })

  return {
    ...sign,
    sources
  }
}

export function createSign(data: SignToDB): Sign {
  const db = getDb()
  const sign: Sign = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO sign (id, created_at)
    VALUES (@id, @createdAt)
  `
  ).run(toSqlParams(sign))
  return sign
}

export function deleteSignById(id: string): void {
  getDb().prepare('DELETE FROM sign WHERE id = ?').run(id)
}

export function registerSignHandlers(): void {
  ipcMain.handle('sign:list', () => listAllSigns())
  ipcMain.handle('sign:find', (_e, id: string) => findSignById(id))
  ipcMain.handle('sign:create', (_e, data: SignToDB) => createSign(data))
  ipcMain.handle('sign:delete', (_e, id: string) => deleteSignById(id))
}
