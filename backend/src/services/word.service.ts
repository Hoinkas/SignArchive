import { getDb } from '../db/client'

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