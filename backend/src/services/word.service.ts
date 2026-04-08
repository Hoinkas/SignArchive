import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { ITagAttached } from '../../../shared/models/tag.model'
import {
  IWordAttached,
  IWordToDB,
  IWordWithCountCategories
} from '../../../shared/models/word.model'

function rowToWord(row: Record<string, unknown>): IWordAttached {
  return {
    id: row.id as string,
    createdAt: row.createdAt as number,
    text: row.text as string
  }
}

function tagsByWordId(wordId: string): ITagAttached[] {
  return getDb()
    .prepare(
      `SELECT tag.* FROM tag
       INNER JOIN tagWord ON tag.id = tagWord.tagId
       WHERE tagWord.wordId = ? ORDER BY tag.name`
    )
    .all(wordId) as ITagAttached[]
}

function regionsByWordId(wordId: string): string[] {
  const rows = getDb()
    .prepare(
      `SELECT DISTINCT source.region FROM source
       INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
       WHERE sourceSignWord.wordId = ? AND source.region IS NOT NULL`
    )
    .all(wordId) as { region: string }[]
  return rows.map((r) => r.region)
}

export function findWordById(id: string): IWordAttached | undefined {
  const row = getDb().prepare('SELECT * FROM word WHERE id = ?').get(id)
  return row ? rowToWord(row as Record<string, unknown>) : undefined
}

export function listAllWords(): IWordWithCountCategories[] {
  const rows = getDb()
    .prepare(
      `SELECT word.*, COUNT(DISTINCT dsw.signId) AS signsCount
       FROM word
       LEFT JOIN definitionSignWord dsw ON dsw.wordId = word.id
       GROUP BY word.id
       ORDER BY word.text`
    )
    .all() as (Record<string, unknown> & { signsCount: number })[]

  if (rows.length === 0) return []

  return rows.map((row) => ({
    ...rowToWord(row),
    signsCount: row.signsCount,
    categories: tagsByWordId(row.id as string),
    regions: regionsByWordId(row.id as string)
  }))
}

export function createWord(data: IWordToDB): IWordAttached {
  const db = getDb()
  const word: IWordAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    text: data.text
  }

  db.prepare('INSERT INTO word (id, createdAt, text) VALUES (@id, @createdAt, @text)').run(word)

  if (data.tagIds && data.tagIds.length > 0) {
    const insert = db.prepare(
      'INSERT OR IGNORE INTO tagWord (tagId, wordId) VALUES (@tagId, @wordId)'
    )
    const insertMany = db.transaction((tagIds: string[]) => {
      tagIds.forEach((tagId) => insert.run({ tagId, wordId: word.id }))
    })
    insertMany(data.tagIds)
  }

  return word
}

export function updateWord(wordId: string, data: Partial<IWordToDB>): IWordAttached | undefined {
  const existing = findWordById(wordId)
  if (!existing) return undefined

  if (data.text) {
    getDb()
      .prepare('UPDATE word SET text = @text WHERE id = @id')
      .run({ text: data.text, id: wordId })
  }

  return findWordById(wordId)
}

export function deleteWord(wordId: string): void {
  getDb().prepare('DELETE FROM word WHERE id = ?').run(wordId)
}
