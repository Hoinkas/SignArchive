import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Author, AuthorToDB } from '@shared/types'
import { toSqlParams } from '../db/utils'

export function listAllAuthors(): Author[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM author ORDER BY name').all()
  return rows as Author[]
}

export function findAuthorById(id: string): Author | undefined {
  const row = getDb().prepare('SELECT * FROM author WHERE id = ?').get(id)
  return row as Author | undefined
}

export function createAuthor(data: AuthorToDB): Author {
  const db = getDb()
  const author: Author = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO Author (id, created_at, name)
    VALUES (@id, @createdAt, @name)
  `
  ).run(toSqlParams(author))
  return author
}

export function deleteAuthorById(id: string): void {
  getDb().prepare('DELETE FROM author WHERE id = ?').run(id)
}

export function registerAuthorHandlers(): void {
  ipcMain.handle('author:list', () => listAllAuthors())
  ipcMain.handle('author:find', (_e, id: string) => findAuthorById(id))
  ipcMain.handle('author:create', (_e, data: AuthorToDB) => createAuthor(data))
  ipcMain.handle('author:delete', (_e, id: string) => deleteAuthorById(id))
}
