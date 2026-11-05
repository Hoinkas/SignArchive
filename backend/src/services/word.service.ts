import { getDb } from '../db/client'
import { IWordAttached } from '../models/word.model'

// RETURN WORDS - BY SIGN ID
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

// RETURN WORDS - BY MEANING ID
export function listWordsNamesByMeaningId(meaningId: string): IWordAttached[] {
  const rows = getDb()
    .prepare(
      `SELECT * FROM word
    INNER JOIN wordMeaning ON wordMeaning.wordId = word.id
    INNER JOIN meaning ON meaning.id = wordMeaning.meaningId
    WHERE meaning.id = ?`
    )
    .all(meaningId) as IWordAttached[]

  return rows || []
}

// FIND ALL WORDS
export function listAllWords(): IWordAttached[] {
  const row = getDb().prepare('SELECT * FROM word').all() as IWordAttached[]
  const sorted = row.sort((a, b) => (a.name > b.name ? 1 : -1))
  return sorted || []
}
