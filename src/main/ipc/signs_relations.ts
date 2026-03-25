import { ipcMain } from 'electron'
import { getDb } from '../db/client'
import type { RelationType, Sign, SignRelation, SignWithRelationType } from '@shared/types'
import { toSqlParams } from '../db/utils'
import { findSignById } from './signs'

export function listAllSignRelations(): SignRelation[] {
  const rows = getDb().prepare('SELECT * FROM signs_relations').all()
  return rows.map(rowToSignRelation)
}

export function findAllRelatedSignsBySignId(signId: string, meaningId: string): SignWithRelationType[] {
  const visited = new Set<string>()
  const result: { sign: Sign; relationType: RelationType }[] = []
  const queue: string[] = [signId]

  while (queue.length > 0) {
    const currentId = queue.shift()!

    if (visited.has(currentId)) continue
    visited.add(currentId)

    const rows = getDb()
      .prepare(`
        SELECT * FROM signs_relations
        WHERE (tail_sign_id = ? OR head_sign_id = ?)
        AND meaning_id = ?
      `)
      .all(currentId, currentId, meaningId)

    const relations: SignRelation[] = rows.map(rowToSignRelation)

    for (const relation of relations) {
      const neighbourId =
        relation.headSignId === currentId ? relation.tailSignId : relation.headSignId

      if (!visited.has(neighbourId)) {
        const sign = findSignById(neighbourId)
        if (sign) {
          result.push({ sign, relationType: relation.relationType })
          queue.push(neighbourId)
        }
      }
    }
  }

  return result
}

export function createSignRelation(data: Omit<SignRelation, 'createdAt'>): SignRelation {
  const db = getDb()
  const relation: SignRelation = {
    ...data,
    createdAt: new Date().toISOString()
  }
  db.prepare(
    `
    INSERT OR REPLACE INTO signs_relations (tail_sign_id, head_sign_id, relation_type, meaning_id, created_at)
    VALUES (@tailSignId, @headSignId, @relationType, @meaningId, @createdAt)
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
  ipcMain.handle('signs_relations:by_sign', (_e, signId: string, meaningId: string) =>
    findAllRelatedSignsBySignId(signId, meaningId)
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
    relationType: row.relation_type as SignRelation['relationType'],
    meaningId: row.meaning_id as string
  }
}
