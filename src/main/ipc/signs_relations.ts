import { ipcMain } from 'electron'
import { getDb } from '../db/client'
import type { SignRelation, SignWithRelationType } from '@shared/types'
import { toSqlParams } from '../db/utils'
import { findSignById } from './signs'

export function findAllRelatedSignsBySignId(
  signId: string,
  wordId: string
): SignWithRelationType[] {
  const visited = new Set<string>([signId])
  const result: SignWithRelationType[] = []
  const queue: string[] = [signId]

  while (queue.length > 0) {
    const currentId = queue.shift()!

    const rows = getDb()
      .prepare(`
        SELECT * FROM signs_relations
        WHERE (tail_sign_id = ? OR head_sign_id = ?)
        AND word_id = ?
      `)
      .all(currentId, currentId, wordId) as Record<string, unknown>[]

    for (const row of rows) {
      const relation = rowToSignRelation(row)
      const neighbourId =
        relation.headSignId === currentId ? relation.tailSignId : relation.headSignId

      if (!visited.has(neighbourId)) {
        visited.add(neighbourId)
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

export function findDuplicateSignIds(wordId: string): SignRelation[] {
  const rows = getDb()
    .prepare(`
      SELECT tail_sign_id FROM signs_relations
      WHERE relation_type = 'duplicate' AND word_id = ?
    `)
    .all(wordId)

  return rows.map(rowToSignRelation)
}

export function createSignRelation(data: Omit<SignRelation, 'createdAt'>): SignRelation {
  const db = getDb()
  const relation: SignRelation = { ...data, createdAt: new Date().toISOString() }

  const insert = db.prepare(`
    INSERT OR REPLACE INTO signs_relations (tail_sign_id, head_sign_id, relation_type, word_id, created_at)
    VALUES (@tailSignId, @headSignId, @relationType, @wordId, @createdAt)
  `)

  db.transaction(() => {
    insert.run(toSqlParams(relation))

    if (data.relationType === 'duplicate') {
      const tailVariants = findAllRelatedSignsBySignId(data.tailSignId, data.wordId).filter(({ relationType }) => relationType === 'variant')

      for (const { sign } of tailVariants) {
        insert.run(toSqlParams({
          tailSignId: data.headSignId,
          headSignId: sign.id,
          relationType: 'variant',
          wordId: data.wordId,
          createdAt: relation.createdAt
        }))
      }

    const tailDuplicates = getDb()
      .prepare(`
        SELECT tail_sign_id FROM signs_relations
        WHERE head_sign_id = ? AND relation_type = 'duplicate' AND word_id = ?
      `)
      .all(data.tailSignId, data.wordId) as { tail_sign_id: string }[]

    for (const { tail_sign_id } of tailDuplicates) {
      insert.run(toSqlParams({
        tailSignId: tail_sign_id,
        headSignId: data.headSignId,
        relationType: 'duplicate',
        wordId: data.wordId,
        createdAt: relation.createdAt
      }))
    }
  }
})()

  return relation
}

export function deleteSignRelation(tailSignId: string, headSignId: string): void {
  getDb()
    .prepare(`DELETE FROM signs_relations WHERE tail_sign_id = ? AND head_sign_id = ?`)
    .run(tailSignId, headSignId)
}

export function registerSignsRelationHandlers(): void {
  ipcMain.handle('signs_relations:list', () =>
    getDb().prepare('SELECT * FROM signs_relations').all().map(rowToSignRelation)
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
    wordId: row.word_id as string
  }
}
