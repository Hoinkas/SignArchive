import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Author, AuthorToDB } from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { ipcMain } from 'electron'
import { handlerWithErrorLogging } from '../utils/errorHandler'

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
    INSERT INTO Author (id, createdAt, name)
    VALUES (@id, @createdAt, @name)
  `
  ).run(toSqlParams(author))
  return author
}

export function deleteAuthorById(id: string): void {
  getDb().prepare('DELETE FROM author WHERE id = ?').run(id)
}

export function registerAuthorHandlers(): void {
  ipcMain.handle('author:list', () => handlerWithErrorLogging(listAllAuthors))
  // ipcMain.handle('author:find', (_, id: string) => findAuthorById(id))
  // ipcMain.handle('author:create', (_, data: AuthorToDB) => createAuthor(data))
  // ipcMain.handle('author:delete', (_, id: string) => deleteAuthorById(id))
}
