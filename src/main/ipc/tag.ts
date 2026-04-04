import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Tag, TagToDB } from '@shared/types'
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
  getDb().prepare('DELETE FROM word WHERE id = ?').run(id)
}

export function createTagAndTagWord(wordId: string, data: TagToDB): Tag {
  const tag = createTag(data)
  createTagWord(tag.id, wordId)

  return tag
}

export function deleteTagAndTagWord(tagId: string): Tag {
  const tag = createTag(data)
  createTagWord(tag.id, wordId)

  return tag
}

export function registerTagHandlers(): void {
  ipcMain.handle('tag:list', () => handlerWithErrorLogging(listAllTags))
  ipcMain.handle('tag:create', (_, wordId: string, data: TagToDB) =>
    handlerWithErrorLogging(() => createTagAndTagWord(wordId, data))
  )
}
