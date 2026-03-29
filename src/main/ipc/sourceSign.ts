import { getDb } from '../db/client'
import type { SourceSign } from '@shared/types'
import toSqlParams from '../utils/toSqlParams'

export function findSourcesIdsBySignId(id: string): string[] {
  const row = getDb().prepare('SELECT * FROM sourceSign WHERE signId = ?').all(id) as SourceSign[]
  return row.map((sourceSign) => sourceSign.sourceId)
}

export function findSignsIdsBySourceId(id: string): string[] {
  const row = getDb().prepare('SELECT * FROM sourceSign WHERE sourceId = ?').all(id) as SourceSign[]
  return row.map((sourceSign) => sourceSign.signId)
}

export function createSourceSign(data: SourceSign): SourceSign {
  const db = getDb()
  db.prepare(
    `
    INSERT INTO sourceSign (sourceId, signId, isMainSource)
    VALUES (@sourceId, @signId, @isMainSource)
  `
  ).run(toSqlParams(data))
  return data
}

export function deleteSourceSignBySourceId(id: string): void {
  getDb().prepare('DELETE FROM sourceSign WHERE sourceId = ?').run(id)
}

export function deleteSourceSignBySignId(id: string): void {
  getDb().prepare('DELETE FROM sourceSign WHERE signId = ?').run(id)
}
