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
import { toSqlParams } from '../db/utils'
import {
  listMeaningsByWordId,
  returnMeaningDetailsById,
  returnMeaningsCountByWordId
} from './meaning'
import { returnSignsCountByWordId } from './sign'

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
  const words = listAllWords()

  return words.map((word) => {
    return {
      ...word,
      meaningsCount: returnMeaningsCountByWordId(word.id),
      signsCount: returnSignsCountByWordId(word.id)
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

export function updateWord(id: string, data: Partial<WordToDB>): Word | undefined {
  const existing = findWordById(id)
  if (!existing) return undefined

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
  ipcMain.handle('word:listWithCount', () => listAllWordsWithCount())
  ipcMain.handle('word:find', (_, id: string) => findWordById(id))
  ipcMain.handle('word:details', (_, id: string) => returnWordDetailsById(id))
  ipcMain.handle('word:create', (_, data: WordToDB) => createWord(data))
  ipcMain.handle('word:update', (_, id: string, data: Partial<Word>) => updateWord(id, data))
  ipcMain.handle('word:delete', (_, id: string) => deleteWordById(id))
}

// ROW MAPPERS
export function rowToWord(row: Record<string, unknown>): Word {
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags as string) : []
  } as Word
}

function rowToSQL(row: Word): Record<string, unknown> {
  return toSqlParams({
    ...row,
    tags: JSON.stringify(row.tags ?? [])
  })
}
