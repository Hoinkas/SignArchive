import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Signer, SignerToDB } from '@shared/types'
import { toSqlParams } from '../db/utils'

export function listAllSigners(): Signer[] {
  const rows = getDb().prepare('SELECT * FROM signer ORDER BY surname, name').all()
  return rows as Signer[]
}

export function findSignerById(id: string): Signer | undefined {
  const row = getDb().prepare('SELECT * FROM signer WHERE id = ?').get(id)
  return row as Signer | undefined
}

export function createSigner(data: SignerToDB): Signer {
  const db = getDb()
  const signer: Signer = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO signer (id, createdAt, name, surname)
    VALUES (@id, @createdAt, @name, @surname)
  `
  ).run(toSqlParams(signer))
  return signer
}

export function deleteSignerById(id: string): void {
  getDb().prepare('DELETE FROM signer WHERE id = ?').run(id)
}

export function registerSignerHandlers(): void {
  ipcMain.handle('signer:list', () => listAllSigners())
  ipcMain.handle('signer:find', (_, id: string) => findSignerById(id))
  ipcMain.handle('signer:create', (_, data: SignerToDB) => createSigner(data))
  ipcMain.handle('signer:delete', (_, id: string) => deleteSignerById(id))
}
