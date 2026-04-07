import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Tag, TagToDB, TagWord } from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { ipcMain } from 'electron'
import { handlerWithErrorLogging } from '../utils/errorHandler'
import { createTagWord } from './tagWord'

export function listAllTags(): Tag[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM tag ORDER BY name').all()
  return rows as Tag[]
}

export function listAllTagsByWordId(wordId: string): Tag[] {
  const rows = getDb()
    .prepare(
      `
      SELECT tag.* FROM tag
      INNER JOIN tagWord ON tagWord.tagId = tag.id
      WHERE tagWord.wordId = ?
      ORDER BY tag.name
    `
    )
    .all(wordId)

  return rows as Tag[]
}

export function findTagById(id: string): Tag | undefined {
  const row = getDb().prepare('SELECT * FROM tag WHERE id = ?').get(id)
  return row as Tag | undefined
}

export function findTagByValues(data: TagToDB): Tag | undefined {
  const db = getDb()
  const row = db.prepare('SELECT * FROM tag WHERE name = @name').get(toSqlParams(data))

  return row as Tag | undefined
}

export function createTag(data: TagToDB): Tag {
  const exists = findTagByValues(data)
  if (exists) return exists

  const db = getDb()
  const tag: Tag = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO tag (id, createdAt, name)
    VALUES (@id, @createdAt, @name)
  `
  ).run(toSqlParams(tag))

  return tag
}

export function deleteTag(tagId: string): void {
  getDb().prepare('DELETE FROM tag WHERE id = ?').run(tagId)
}

export function createTagAndTagWord(wordId: string, data: TagToDB): Tag {
  const transaction = getDb().transaction(() => {
    const tag = createTag(data)

    const tagWord: TagWord = { tagId: tag.id, wordId }
    createTagWord(tagWord)

    return tag
  })

  return transaction()
}

export function addTagToWord(tagId: string, wordId: string): void {
  const tagWord: TagWord = { tagId, wordId }
  createTagWord(tagWord)
}

export function removeTagFromWord(tagId: string, wordId: string): void {
  getDb().prepare('DELETE FROM tagWord WHERE tagId = ? AND wordId = ?').run(tagId, wordId)
}

export function registerTagHandlers(): void {
  ipcMain.handle('tag:list', () => handlerWithErrorLogging(listAllTags))
  ipcMain.handle('tag:listByWordId', (_, wordId) =>
    handlerWithErrorLogging(() => listAllTagsByWordId(wordId))
  )
  ipcMain.handle('tag:addToWord', (_, tagId: string, wordId: string) =>
    handlerWithErrorLogging(() => addTagToWord(tagId, wordId))
  )
  ipcMain.handle('tag:removeFromWord', (_, tagId: string, wordId: string) =>
    handlerWithErrorLogging(() => removeTagFromWord(tagId, wordId))
  )
}
