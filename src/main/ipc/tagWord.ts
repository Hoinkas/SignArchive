import { TagWord } from '@shared/types'
import { getDb } from '../db/client'

export function createTagWord(data: TagWord): void {
  const db = getDb()
  db.prepare(
    `
    INSERT INTO tagWord (tagId, wordId)
    VALUES (@tagId, @wordId)
  `
  ).run(data)
}
