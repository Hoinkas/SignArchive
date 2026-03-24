import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Meaning } from '@shared/types'
import { toSqlParams } from '../db/utils'

export function listAllMeanings(): Meaning[] {
  const rows = getDb().prepare('SELECT * FROM meanings ORDER BY created_at DESC').all()
  return rows.map(rowToMeaning)
}

export function findMeaningById(id: string): Meaning | undefined {
  const row = getDb().prepare('SELECT * FROM meanings WHERE id = ?').get(id)
  if (!row) return undefined
  return rowToMeaning(row as Record<string, unknown>)
}

export function findMeaningsBySignId(signId: string): Meaning[] {
  const rows = getDb().prepare('SELECT * FROM meanings WHERE sign_id = ?').all(signId)
  return rows.map(rowToMeaning)
}

export function findMeaningsByWordId(wordId: string): Meaning[] {
  const rows = getDb().prepare('SELECT * FROM meanings WHERE word_id = ?').all(wordId)
  return rows.map(rowToMeaning)
}

export function returnCountOfSignsInWordByWordId(wordId: string): number {
  const counter = getDb().prepare('SELECT COUNT(*) FROM meanings WHERE word_id = ?').all(wordId)
  return rowToSignCount(counter)
}

export function createMeaning(data: Omit<Meaning, 'id' | 'createdAt'>): Meaning {
  const db = getDb()
  const meaning: Meaning = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO meanings (id, created_at, sign_id, word_id, context, region, year_start, year_end, source_reliability, usage_frequency, notes)
    VALUES (@id, @createdAt, @signId, @wordId, @context, @region, @yearStart, @yearEnd, @sourceReliability, @usageFrequency, @notes)
  `
  ).run(toSqlParams(meaning))
  return meaning
}

export function updateMeaning(
  id: string,
  data: Partial<Omit<Meaning, 'id' | 'createdAt'>>
): Meaning | undefined {
  const existing = findMeaningById(id)
  if (!existing) return undefined

  const updated: Meaning = { ...existing, ...data }
  getDb()
    .prepare(
      `
    UPDATE meanings
    SET sign_id = @signId, word_id = @wordId, context = @context,
        region = @region, year_start = @yearStart, year_end = @yearEnd,
        source_reliability = @sourceReliability, usage_frequency = @usageFrequency,
        notes = @notes
    WHERE id = @id
  `
    )
    .run(updated)
  return updated
}

export function deleteMeaningById(id: string): void {
  getDb().prepare('DELETE FROM meanings WHERE id = ?').run(id)
}

export function registerMeaningsHandlers(): void {
  ipcMain.handle('meanings:list', () => listAllMeanings())
  ipcMain.handle('meanings:find', (_e, id: string) => findMeaningById(id))
  ipcMain.handle('meanings:by_sign', (_e, signId: string) => findMeaningsBySignId(signId))
  ipcMain.handle('meanings:by_word', (_e, wordId: string) => findMeaningsByWordId(wordId))
  ipcMain.handle('meanings:create', (_e, data: Omit<Meaning, 'id' | 'createdAt'>) =>
    createMeaning(data)
  )
  ipcMain.handle('meanings:update', (_e, id: string, data: Partial<Meaning>) =>
    updateMeaning(id, data)
  )
  ipcMain.handle('meanings:delete', (_e, id: string) => deleteMeaningById(id))
}

export function rowToMeaning(row: Record<string, unknown>): Meaning {
  return {
    id: row.id as string,
    createdAt: row.created_at as string,
    signId: row.sign_id as string,
    wordId: row.word_id as string,
    context: row.context as string | undefined,
    region: row.region as string | undefined,
    yearStart: row.year_start as number | undefined,
    yearEnd: row.year_end as number | undefined,
    sourceReliability: row.source_reliability as Meaning['sourceReliability'],
    usageFrequency: row.usage_frequency as Meaning['usageFrequency'],
    notes: row.notes as string | undefined
  }
}

export function rowToSignCount(signCount): number {
  return signCount[0]['COUNT(*)']
}
