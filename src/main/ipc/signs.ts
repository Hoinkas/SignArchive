import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Sign } from '@shared/types'
import { toSqlParams } from '../db/utils'

export function listAllSigns(): Sign[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM signs ORDER BY created_at DESC').all()
  return rows.map(rowToSign)
}

export function findSignById(id: string): Sign | undefined {
  const row = getDb().prepare('SELECT * FROM signs WHERE id = ?').get(id)
  if (!row) return undefined
  return rowToSign(row as Record<string, unknown>)
}

export function createSign(data: Omit<Sign, 'id' | 'createdAt'>): Sign {
  const db = getDb()
  const sign: Sign = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO signs (id, created_at, notes, status, hand_shape, location, movement, phonology_extended, type)
    VALUES (@id, @createdAt, @notes, @status, @handShape, @location, @movement, @phonologyExtended, @type)
  `
  ).run(toSqlParams(sign))
  return sign
}

export function updateSign(
  id: string,
  data: Partial<Omit<Sign, 'id' | 'createdAt'>>
): Sign | undefined {
  const db = getDb()
  const existing = findSignById(id)
  if (!existing) return undefined

  const updated: Sign = { ...existing, ...data }
  db.prepare(
    `
    UPDATE signs
    SET notes = @notes, status = @status, hand_shape = @handShape,
        location = @location, movement = @movement,
        phonology_extended = @phonologyExtended, type = @type
    WHERE id = @id
  `
  ).run(toSqlParams(updated))
  return updated
}

export function deleteSignById(id: string): void {
  getDb().prepare('DELETE FROM signs WHERE id = ?').run(id)
}

export function registerSignsHandlers(): void {
  ipcMain.handle('signs:list', () => listAllSigns())
  ipcMain.handle('signs:find', (_e, id: string) => findSignById(id))
  ipcMain.handle('signs:create', (_e, data: Omit<Sign, 'id' | 'createdAt'>) => createSign(data))
  ipcMain.handle('signs:update', (_e, id: string, data: Partial<Sign>) => updateSign(id, data))
  ipcMain.handle('signs:delete', (_e, id: string) => deleteSignById(id))
}

export function rowToSign(row: Record<string, unknown>): Sign {
  return {
    id: row.id as string,
    createdAt: row.created_at as string,
    notes: row.notes as string | undefined,
    status: row.status as Sign['status'],
    handShape: row.hand_shape as string | undefined,
    location: row.location as string | undefined,
    movement: row.movement as string | undefined,
    phonologyExtended: row.phonology_extended as string | undefined,
    type: row.type as Sign['type'] | undefined
  }
}
