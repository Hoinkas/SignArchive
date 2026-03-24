import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Signer } from '@shared/types'
import { toSqlParams } from '../db/utils'

export function listAllSigners(): Signer[] {
  const rows = getDb().prepare('SELECT * FROM signers ORDER BY surname, name').all()
  return rows.map(rowToSigner)
}

export function findSignerById(id: string): Signer | undefined {
  const row = getDb().prepare('SELECT * FROM signers WHERE id = ?').get(id)
  if (!row) return undefined
  return rowToSigner(row as Record<string, unknown>)
}

export function createSigner(data: Omit<Signer, 'id' | 'createdAt'>): Signer {
  const db = getDb()
  const signer: Signer = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO signers (id, created_at, name, surname, deafness_type)
    VALUES (@id, @createdAt, @name, @surname, @deafnessType)
  `
  ).run(toSqlParams(signer))
  return signer
}

export function deleteSignerById(id: string): void {
  getDb().prepare('DELETE FROM signers WHERE id = ?').run(id)
}

export function registerSignerHandlers(): void {
  ipcMain.handle('signers:list', () => listAllSigners())
  ipcMain.handle('signers:create', (_e, data: Omit<Signer, 'id' | 'createdAt'>) =>
    createSigner(data)
  )
  ipcMain.handle('signers:delete', (_e, id: string) => deleteSignerById(id))
}

export function rowToSigner(row: Record<string, unknown>): Signer {
  return {
    id: row.id as string,
    createdAt: row.created_at as string,
    name: row.name as string,
    surname: row.surname as string,
    deafnessType: row.deafness_type as Signer['deafnessType'] | undefined
  }
}
