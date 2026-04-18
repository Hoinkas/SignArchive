import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IWordAttached, IWord } from '../../../shared/models/word.model'
import { fillMissingValues } from '../utils/helpers.functions'
import { wordTemplate } from '../models/word.model'

// FIND
export function findWordById(wordId: string): IWordAttached | undefined {
  const row = getDb().prepare('SELECT * FROM word WHERE id = ?').get(wordId)
  return row ? (row as IWordAttached) : undefined
}

export function findWordByName(name: string): IWordAttached | undefined {
  const row = getDb().prepare('SELECT * FROM word WHERE name = ?').get(name)
  return row ? (row as IWordAttached) : undefined
}

export function findWordsByMeaningId(meaningId: string): IWordAttached[] {
  const row = getDb().prepare('SELECT * FROM word WHERE id = ?').get(meaningId)
  return row as IWordAttached[]
}

// CREATE
function createWord(data: IWord): IWordAttached {
  const db = getDb()

  const existing = findWordByName(data.name)
  if (existing) return existing

  const word: IWordAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    name: data.name
  }

  db.prepare('INSERT INTO word (id, createdAt, name) VALUES (@id, @createdAt, @text)').run(
    fillMissingValues<IWord>(word, wordTemplate)
  )

  return { ...word }
}

export function createWords(regions: IWord[]): IWordAttached[] {
  const transaction = getDb().transaction(() => {
    return regions.map((r) => createWord(r))
  })

  return transaction()
}

// DELETE
function deleteWord(wordId: string): void {
  getDb().prepare('DELETE FROM word WHERE id = ?').run(wordId)
}

export function deleteUnusedWords(): void {
  const rows = getDb()
    .prepare(
      `SELECT * FROM word
    LEFT JOIN wordMeaning ON region.id = wordMeaning.wordId
    WHERE regionSource.wordId IS NULL
    `
    )
    .get() as IWordAttached[]

  if (rows.length > 0) return

  rows.forEach((r) => deleteWord(r.id))
}
