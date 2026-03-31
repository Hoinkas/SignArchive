import { getDb } from '../db/client'
import type { DefinitionSignWord } from '@shared/types'
import toSqlParams from '../utils/toSqlParams'

export function findSignsIdsByWordId(wordId: string): string[] {
  const db = getDb()
  const rows = db
    .prepare('SELECT * FROM definitionSignWord WHERE wordId = ?')
    .all(wordId) as DefinitionSignWord[]
  return rows.map((dsw) => dsw.signId)
}

export function findDefinitionsIdsBySignWordId(signId: string, wordId: string): string[] {
  const db = getDb()
  const rows = db
    .prepare('SELECT * FROM definitionSignWord WHERE signId = ? AND wordId = ?')
    .all(signId, wordId) as DefinitionSignWord[]
  return rows.map((dsw) => dsw.definitionId)
}

export function createDefinitionSignWord(data: DefinitionSignWord): DefinitionSignWord {
  const db = getDb()
  db.prepare(
    `
    INSERT INTO definitionSignWord (definitionId, signId, wordId)
    VALUES (@definitionId, @signId, @wordId)
  `
  ).run(toSqlParams(data))
  return data
}
