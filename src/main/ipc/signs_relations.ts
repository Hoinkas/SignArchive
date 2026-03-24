import { ipcMain } from 'electron'
import { getDb } from '../db/client'
import type { SignRelation } from '@shared/types'
import { toSqlParams } from '../db/utils'

export function listAllSignRelations(): SignRelation[] {
  const rows = getDb().prepare('SELECT * FROM signs_relations').all()
  return rows.map(rowToSignRelation)
}

export function findSignRelationsBySignId(signId: string): SignRelation[] {
  const rows = getDb()
    .prepare(
      `
    SELECT * FROM signs_relations
    WHERE tail_sign_id = ? OR head_sign_id = ?
  `
    )
    .all(signId, signId)
  return rows.map(rowToSignRelation)
}

export function createSignRelation(data: Omit<SignRelation, 'createdAt'>): SignRelation {
  const db = getDb()
  const relation: SignRelation = {
    ...data,
    createdAt: new Date().toISOString()
  }
  db.prepare(
    `
    INSERT OR REPLACE INTO signs_relations (tail_sign_id, head_sign_id, relation_type, created_at)
    VALUES (@tailSignId, @headSignId, @relationType, @createdAt)
  `
  ).run(toSqlParams(relation))
  return relation
}

export function deleteSignRelation(tailSignId: string, headSignId: string): void {
  getDb()
    .prepare(
      `
    DELETE FROM signs_relations WHERE tail_sign_id = ? AND head_sign_id = ?
  `
    )
    .run(tailSignId, headSignId)
}

export function registerSignsRelationHandlers(): void {
  ipcMain.handle('signs_relations:list', () => listAllSignRelations())
  ipcMain.handle('signs_relations:by_sign', (_e, signId: string) =>
    findSignRelationsBySignId(signId)
  )
  ipcMain.handle('signs_relations:create', (_e, data: Omit<SignRelation, 'createdAt'>) =>
    createSignRelation(data)
  )
  ipcMain.handle('signs_relations:delete', (_e, tailSignId: string, headSignId: string) =>
    deleteSignRelation(tailSignId, headSignId)
  )
}

export function rowToSignRelation(row: Record<string, unknown>): SignRelation {
  return {
    createdAt: row.created_at as string,
    tailSignId: row.tail_sign_id as string,
    headSignId: row.head_sign_id as string,
    relationType: row.relation_type as SignRelation['relationType']
  }
}
