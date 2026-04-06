import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Tag, Word, WordToDB, WordWithCount, WordWithCountCategories } from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { handlerWithErrorLogging } from '../utils/errorHandler'

export function findWordById(wordId: string): Word | undefined {
  const row = getDb().prepare('SELECT * FROM word WHERE id = ?').get(wordId)
  return row ? (row as Word) : undefined
}

export function listAllWordsCountCategories(): WordWithCountCategories[] {
  const rows = getDb()
    .prepare(
      `
      SELECT
        word.*,
        COUNT(DISTINCT dsw.signId) AS signsCount
      FROM word
      LEFT JOIN definitionSignWord dsw ON dsw.wordId = word.id
      GROUP BY word.id
      ORDER BY word.text
    `
    )
    .all() as WordWithCount[]

  if (!rows[0].id) return []

  const words: WordWithCountCategories[] = rows.map((w) => {
    return { ...w, categories: allCategoriesByWordId(w.id), regions: allRegionsByWordId(w.id) }
  })

  return words
}

export function createWord(data: WordToDB): Word {
  const db = getDb()
  const word: Word = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO word (id, createdAt, text)
    VALUES (@id, @createdAt, @text)
  `
  ).run(toSqlParams(word))

  return word
}

export function deleteWordById(id: string): void {
  getDb().prepare('DELETE FROM word WHERE id = ?').run(id)
}

export function updateWord(wordId: string, data: Partial<WordToDB>): Word | undefined {
  const existing = findWordById(wordId)
  if (!existing) return

  getDb()
    .prepare(
      `
        UPDATE word
        SET text = @text
        WHERE id = @id
      `
    )
    .run(toSqlParams(data))

  return findWordById(existing.id)
}

export function allCategoriesByWordId(wordId: string): Tag[] {
  const db = getDb()

  const rows = db
    .prepare(
      `
      SELECT DISTINCT tag.* FROM tag
      INNER JOIN tagWord ON tag.id = tagWord.tagId
      WHERE tagWord.wordId = ?
    `
    )
    .all(wordId)

  return rows as Tag[]
}

export function allRegionsByWordId(wordId: string): string[] {
  const db = getDb()

  const rows = db
    .prepare(
      `
      SELECT DISTINCT source.region FROM source
      INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
      WHERE sourceSignWord.wordId = ?
    `
    )
    .all(wordId)

  return rows.map((r) => r.region) as string[]
}

export function registerWordHandlers(): void {
  ipcMain.handle('word:listWithCount', () =>
    handlerWithErrorLogging(() => listAllWordsCountCategories())
  )
  ipcMain.handle('word:details', (_, id: string) => handlerWithErrorLogging(() => findWordById(id)))
  ipcMain.handle('word:create', (_, data: WordToDB) =>
    handlerWithErrorLogging(() => createWord(data))
  )
  ipcMain.handle('word:update', (_, wordId: string, data: Partial<WordToDB>) =>
    handlerWithErrorLogging(() => updateWord(wordId, data))
  )
  ipcMain.handle('word:delete', (_, id: string) =>
    handlerWithErrorLogging(() => deleteWordById(id))
  )
}
