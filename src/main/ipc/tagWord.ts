import { getDb } from '../db/client'

export function createTagWord(tagId: string, wordId: string): void {
  const db = getDb()
  db.prepare(
    `
    INSERT INTO tagWord (tagId, wordId)
    VALUES (@tagId, @wordId)
  `
  ).run(tagId, wordId)
}
