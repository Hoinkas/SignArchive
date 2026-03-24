import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Source } from '@shared/types'
import { toSqlParams } from '../db/utils'

export function listAllSources(): Source[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM sources ORDER BY name').all()
  return rows.map(rowToSource)
}

export function findSourceById(id: string): Source | undefined {
  const row = getDb().prepare('SELECT * FROM sources WHERE id = ?').get(id)
  if (!row) return undefined
  return rowToSource(row as Record<string, unknown>)
}

export function createSource(data: Omit<Source, 'id' | 'createdAt'>): Source {
  const db = getDb()
  const source: Source = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO sources (id, created_at, name, online_url, region)
    VALUES (@id, @createdAt, @name, @onlineUrl, @region)
  `
  ).run(toSqlParams(source))
  return source
}

export function deleteSourceById(id: string): void {
  getDb().prepare('DELETE FROM sources WHERE id = ?').run(id)
}

export function registerSourceHandlers(): void {
  ipcMain.handle('sources:list', () => listAllSources())
  ipcMain.handle('sources:create', (_e, data: Omit<Source, 'id' | 'createdAt'>) =>
    createSource(data)
  )
  ipcMain.handle('sources:delete', (_e, id: string) => deleteSourceById(id))
}

export function rowToSource(row: Record<string, unknown>): Source {
  return {
    id: row.id as string,
    createdAt: row.created_at as string,
    name: row.name as string,
    onlineUrl: row.online_url as string | undefined,
    region: row.region as string | undefined
  }
}
