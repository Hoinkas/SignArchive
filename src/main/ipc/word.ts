import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type {
  SignWithDetails,
  Word,
  WordToDB,
  WordWithCounts,
  WordWithSignsDetails
} from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { handlerWithErrorLogging } from '../utils/errorHandler'
import { findSignsIdsByWordId } from './definitionSignWord'
import { returnSignDetailsBySignWordId } from './sign'

export function findWordById(wordId: string): Word | undefined {
  const row = getDb().prepare('SELECT * FROM word WHERE id = ?').get(wordId)
  return row ? rowToWord(row as Record<string, unknown>) : undefined
}

export function listAllWordsWithSignCount(): WordWithCounts[] {
  const rows = getDb()
    .prepare(
      `
    SELECT
      word.*,
      COUNT(DISTINCT dsw.signId) AS signsCount
    FROM word
    LEFT JOIN definitionSignWord dsw ON dsw.wordId = word.id
    ORDER BY word.text
  `
    )
    .all()

  if (!rows[0].id) return []

  return rows.map((row: Record<string, unknown>) => {
    return {
      ...rowToWord(row),
      signsCount: row.signsCount as number
    }
  })
}

export function returnWordDetailsById(wordId: string): WordWithSignsDetails | undefined {
  const word = findWordById(wordId)
  if (!word) return

  const signsIds = findSignsIdsByWordId(wordId)
  const signsDetails: SignWithDetails[] = []

  signsIds.forEach((signId) => {
    const signDetails = returnSignDetailsBySignWordId(signId, wordId)
    if (signDetails) signsDetails.push(signDetails)
  })

  return {
    ...word,
    signs: signsDetails
  }
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
    INSERT INTO word (id, createdAt, text, tags)
    VALUES (@id, @createdAt, @text, @tags)
  `
  ).run(rowToSQL(word))
  return word
}

export function deleteWordById(id: string): void {
  getDb().prepare('DELETE FROM word WHERE id = ?').run(id)
}

export function updateWord(wordId: string, data: Partial<WordToDB>): Word | undefined {
  const existing = findWordById(wordId)
  if (!existing) return

  const updated: Record<string, unknown> = rowToSQL({ ...existing, ...data })

  getDb()
    .prepare(
      `
        UPDATE word
        SET text = @text, tags = @tags
        WHERE id = @id
      `
    )
    .run(toSqlParams(updated))
  return rowToWord(updated)
}

export function registerWordHandlers(): void {
  ipcMain.handle('word:listWithCount', () =>
    handlerWithErrorLogging(() => listAllWordsWithSignCount())
  )
  ipcMain.handle('word:details', (_, id: string) =>
    handlerWithErrorLogging(() => returnWordDetailsById(id))
  )
  ipcMain.handle('word:create', (_, data: WordToDB) =>
    handlerWithErrorLogging(() => createWord(data))
  )
  ipcMain.handle('word:update', (_, id: string, data: Partial<Word>) =>
    handlerWithErrorLogging(() => updateWord(id, data))
  )
  ipcMain.handle('word:delete', (_, id: string) =>
    handlerWithErrorLogging(() => deleteWordById(id))
  )
}

// ROW MAPPERS
export function rowToWord(row: Record<string, unknown>): Word {
  return {
    id: row.id as string,
    createdAt: row.createdAt as string,
    text: row.text as string,
    tags: row.tags ? JSON.parse(row.tags as string) : []
  }
}

function rowToSQL(row: Word): Record<string, unknown> {
  return toSqlParams({
    ...row,
    tags: JSON.stringify(row.tags ?? [])
  })
}
