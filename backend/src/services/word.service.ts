import { getDb } from '../db/client'
import { IWordAttached } from '../models/word.model'

// RETURN NAMES
export function listWordsNamesBySignId(signId: string): string[] {
  const rows = getDb()
    .prepare(
      `SELECT word.name FROM word
    INNER JOIN wordMeaning ON wordMeaning.wordId = word.id
    INNER JOIN meaning ON meaning.id = wordMeaning.meaningId
    WHERE meaning.signId = ?`
    )
    .all(signId) as { name: string }[]

  return rows.flatMap((r) => r.name)
}

export function listWordsNamesByMeaningId(meaningId: string): IWordAttached[] {
  const rows = getDb()
    .prepare(
      `SELECT * FROM word
    INNER JOIN wordMeaning ON wordMeaning.wordId = word.id
    INNER JOIN meaning ON meaning.id = wordMeaning.meaningId
    WHERE meaning.id = ?`
    )
    .all(meaningId) as IWordAttached[]

  return rows
}

// FIND
export function listAllWords(): IWordAttached[] {
  const row = getDb().prepare('SELECT * FROM word').all() as IWordAttached[]
  const sorted = row.sort((a, b) => (a.name > b.name ? 1 : -1))
  return sorted
}
