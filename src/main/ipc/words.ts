import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type {
  Word,
  WordWithDetails,
  MeaningWithSigns,
  SignWithSourceSignerMediaFile,
  WordWithSignCount,
  RelationType
} from '@shared/types'
import { findMediaFilesBySignId } from './media_files'
import { findSourceById } from './sources'
import { findSignerById } from './signers'
import { findMeaningsByWordId, returnCountOfSignsInWordByWordId } from './meanings'
import { findSignById } from './signs'
import { toSqlParams } from '../db/utils'
import { findAllRelatedSignsBySignId } from './signs_relations'

export function listAllWords(): Word[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM words ORDER BY text').all()
  return rows.map(rowToWord)
}

export function listAllWordsWithSignCount(): WordWithSignCount[] {
  const rows: WordWithSignCount[] = listAllWords().map((word) => {
    return {
      ...word,
      signCount: returnCountOfSignsInWordByWordId(word.id)
    }
  })
  return rows
}

export function findWordById(id: string): Word | undefined {
  const row = getDb().prepare('SELECT * FROM words WHERE id = ?').get(id)
  if (!row) return undefined
  return rowToWord(row as Record<string, unknown>)
}

export function listDetailsForWordById(id: string): WordWithDetails | undefined {
  const word = findWordById(id)
  if (!word) return undefined

  const usedSignsIds: string[] = []

  const meaning = findMeaningsByWordId(id)
  const meanings: MeaningWithSigns[] = []

  meaning.forEach((meaning) => {
    const sign = findSignById(meaning.signId)
    if (!sign) {
      meanings.push({ meaning, signs: [] })
      return
    }
    if (usedSignsIds.includes(sign.id)) return

    const allSignsInMeaning = [
      ...findAllRelatedSignsBySignId(sign.id),
      { sign, relationType: 'variant' as RelationType }
    ].filter(({ sign: s }) => s && !usedSignsIds.includes(s.id))

    const signs: SignWithSourceSignerMediaFile[] = []

    allSignsInMeaning.forEach(({ sign: s, relationType }) => {
      if (relationType === 'duplicate') {
        usedSignsIds.push(s.id)
        return
      }

      usedSignsIds.push(s.id)

      const mediaFile = findMediaFilesBySignId(s.id)[0]
      const source = findSourceById(mediaFile.sourceId)
      const signer = mediaFile?.signerId ? findSignerById(mediaFile.signerId) : undefined

      signs.push({ sign: s, mediaFile, source, signer })
    })

    meanings.push({ meaning, signs })
  })

  return { word, meanings }
}

export function createWord(data: Omit<Word, 'id' | 'createdAt'>): Word {
  const db = getDb()
  const word: Word = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO words (id, created_at, text, definition, parent_word_id, aliases, tags)
    VALUES (@id, @createdAt, @text, @definition, @parentWordId, @aliases, @tags)
  `
  ).run(rowToSQL(word))
  return word
}

export function deleteWordById(id: string): void {
  getDb().prepare('DELETE FROM words WHERE id = ?').run(id)
}

export function updateWord(
  id: string,
  data: Partial<Omit<Word, 'id' | 'createdAt'>>
): Word | undefined {
  const existing = findWordById(id)
  if (!existing) return undefined

  const updated: Record<string, unknown> = rowToSQL({ ...existing, ...data })

  getDb()
    .prepare(
      `
        UPDATE words
        SET text = @text, definition = @definition, parent_word_id = @parentWordId,
            aliases = @aliases, tags = @tags
        WHERE id = @id
      `
    )
    .run(updated)
  return rowToWord(updated)
}

export function registerWordsHandlers(): void {
  ipcMain.handle('words:list', () => listAllWords())
  ipcMain.handle('words:list_full', (_e, id: string) => listDetailsForWordById(id))
  ipcMain.handle('words:list_signs_count', () => listAllWordsWithSignCount())
  ipcMain.handle('words:create', (_e, data: Omit<Word, 'id' | 'createdAt'>) => createWord(data))
  ipcMain.handle('words:delete', (_e, id: string) => deleteWordById(id))
  ipcMain.handle('words:update', (_e, id: string, data: Partial<Word>) => updateWord(id, data))
}

// ROW MAPPERS

export function rowToWord(row: Record<string, unknown>): Word {
  return {
    id: row.id as string,
    createdAt: row.created_at as string,
    text: row.text as string,
    definition: row.definition as string | undefined,
    parentWordId: row.parent_word_id as string | undefined,
    aliases: row.aliases ? JSON.parse(row.aliases as string) : [],
    tags: row.tags ? JSON.parse(row.tags as string) : []
  }
}

function rowToSQL(row: Word): Record<string, unknown> {
  return toSqlParams({
    ...row,
    aliases: JSON.stringify(row.aliases ?? []),
    tags: JSON.stringify(row.tags ?? [])
  })
}
