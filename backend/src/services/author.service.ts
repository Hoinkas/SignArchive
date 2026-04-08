import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IAuthor, IAuthorAttached } from '../../../shared/models/author.model'

export function listAllAuthors(): IAuthorAttached[] {
  return getDb().prepare('SELECT * FROM author ORDER BY name').all() as IAuthorAttached[]
}

export function findAuthorById(id: string): IAuthorAttached | undefined {
  return getDb().prepare('SELECT * FROM author WHERE id = ?').get(id) as IAuthorAttached | undefined
}

export function createAuthor(data: IAuthor): IAuthorAttached {
  const existing = getDb().prepare('SELECT * FROM author WHERE name = ?').get(data.name) as
    | IAuthorAttached
    | undefined
  if (existing) return existing

  const author: IAuthorAttached = { id: nanoid(), createdAt: Date.now(), name: data.name }
  getDb()
    .prepare('INSERT INTO author (id, createdAt, name) VALUES (@id, @createdAt, @name)')
    .run(author)
  return author
}
