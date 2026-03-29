import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type {
  MeaningWithSignsDetails,
  Word,
  WordToDB,
  WordWithCounts,
  WordWithMeaningsDetails
} from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { listMeaningsByWordId, returnMeaningDetailsById } from './meaning'
import { handlerWithErrorLogging } from '../utils/errorHandler'
import validateId from '../utils/validateId'

export function listAllWords(): Word[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM word ORDER BY text').all()
  return rows.map(rowToWord)
}

export function findWordById(wordId: string): Word | undefined {
  const row = getDb().prepare('SELECT * FROM word WHERE id = ?').get(wordId)
  return row ? rowToWord(row as Record<string, unknown>) : undefined
}

export function listAllWordsWithCount(): WordWithCounts[] {
  const rows = getDb()
    .prepare(
      `
    SELECT
      w.*,
      COUNT(DISTINCT m.id) AS meaningsCount,
      COUNT(DISTINCT ms.signId) AS signsCount
    FROM word w
    LEFT JOIN meaning m ON m.wordId = w.id
    LEFT JOIN meaningSign ms ON ms.meaningId = m.id
    GROUP BY w.id
    ORDER BY w.text
  `
    )
    .all()

  return rows.map((row: Record<string, unknown>) => {
    return {
      ...rowToWord(row),
      meaningsCount: row.meaningsCount as number,
      signsCount: row.signsCount as number
    }
  })
}

export function returnWordDetailsById(wordId: string): WordWithMeaningsDetails | undefined {
  const word = findWordById(wordId)
  if (!word) return

  const meanings = listMeaningsByWordId(wordId)
  const meaningsWithDetails: MeaningWithSignsDetails[] = []

  if (meanings) {
    meanings.forEach((meaning) => {
      const meaningDetails = returnMeaningDetailsById(meaning.id)
      if (!meaningDetails) return
      meaningsWithDetails.push(meaningDetails)
    })
  }

  return {
    ...word,
    meanings: meaningsWithDetails
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
    INSERT INTO word (id, createdAt, text, definition, tags)
    VALUES (@id, @createdAt, @text, @definition, @tags)
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

  validateId(wordId)

  const updated: Record<string, unknown> = rowToSQL({ ...existing, ...data })

  getDb()
    .prepare(
      `
        UPDATE word
        SET text = @text, definition = @definition, tags = @tags
        WHERE id = @id
      `
    )
    .run(toSqlParams(updated))
  return rowToWord(updated)
}

export function registerWordHandlers(): void {
  ipcMain.handle('word:listWithCount', () => handlerWithErrorLogging(() => listAllWordsWithCount()))
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
    definition: row.definition as string | undefined,
    tags: row.tags ? JSON.parse(row.tags as string) : []
  }
}

function rowToSQL(row: Word): Record<string, unknown> {
  return toSqlParams({
    ...row,
    tags: JSON.stringify(row.tags ?? [])
  })
}
