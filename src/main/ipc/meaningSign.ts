import { getDb } from '../db/client'
import type { MeaningSign } from '@shared/types'
import { toSqlParams } from '../utils/toSqlParams'

export function findMeaningsIdsBySignId(id: string): string[] {
  const row = getDb().prepare('SELECT * FROM meaningSign WHERE signId = ?').all(id) as MeaningSign[]
  return row.map((meaningSign) => meaningSign.meaningId)
}

export function findSignsIdsByMeaningId(id: string): string[] {
  const row = getDb()
    .prepare('SELECT * FROM meaningSign WHERE meaningId = ?')
    .all(id) as MeaningSign[]
  return row.map((meaningSign) => meaningSign.signId)
}

export function createMeaningSign(data: MeaningSign): MeaningSign {
  const db = getDb()
  db.prepare(
    `
    INSERT INTO meaningSign (meaningId, signId)
    VALUES (@meaningId, @signId)
  `
  ).run(toSqlParams(data))
  return data
}

export function deleteMeaningSignByMeaningId(id: string): void {
  getDb().prepare('DELETE FROM meaningSign WHERE meaningId = ?').run(id)
}

export function deleteMeaningSignBySignId(id: string): void {
  getDb().prepare('DELETE FROM meaningSign WHERE signId = ?').run(id)
}
