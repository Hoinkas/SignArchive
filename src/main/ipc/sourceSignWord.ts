import { getDb } from '../db/client'
import type { SourceSignWord } from '@shared/types'
import toSqlParams from '../utils/toSqlParams'

export function findSignsIdsByWordId(wordId: string): string[] {
  const db = getDb()
  const rows = db
    .prepare('SELECT * FROM sourceSignWord WHERE wordId = ?')
    .all(wordId) as SourceSignWord[]
  return rows.map((dsw) => dsw.signId)
}

export function createSourceSignWord(data: SourceSignWord): SourceSignWord {
  const db = getDb()
  db.prepare(
    `
    INSERT INTO sourceSignWord (sourceId, signId, wordId)
    VALUES (@sourceId, @signId, @wordId)
  `
  ).run(toSqlParams(data))
  return data
}
