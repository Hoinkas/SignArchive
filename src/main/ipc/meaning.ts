import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type {
  Meaning,
  MeaningToDB,
  MeaningWithSignsDetails,
  SignWithSourcesDetails
} from '@shared/types'
import { toSqlParams } from '../db/utils'
import { findSignsIdsByMeaningId } from './meaningSign'
import { returnSignDetailsById } from './sign'

export function listAllMeanings(): Meaning[] {
  const rows = getDb().prepare('SELECT * FROM meaning ORDER BY createdAt DESC').all()
  return rows as Meaning[]
}

export function findMeaningById(meaningId: string): Meaning | undefined {
  const row = getDb().prepare('SELECT * FROM meaning WHERE id = ?').get(meaningId)
  return row as Meaning | undefined
}

export function listMeaningsByWordId(wordId): Meaning[] {
  const row = getDb().prepare('SELECT * FROM meaning WHERE wordId = ?').all(wordId)
  return row as Meaning[]
}

export function returnMeaningsCountByWordId(wordId: string): number {
  const row = getDb().prepare('SELECT COUNT(*) count FROM meaning WHERE wordId = ?').get(wordId)
  return row.count
}

export function returnMeaningDetailsById(meaningId: string): MeaningWithSignsDetails | undefined {
  const meaning = findMeaningById(meaningId)
  if (!meaning) return

  const signsIds = findSignsIdsByMeaningId(meaningId)
  const signs: SignWithSourcesDetails[] = []

  signsIds.forEach((signId) => {
    const signDetail = returnSignDetailsById(signId)
    if (!signDetail) return
    signs.push(signDetail)
  })

  return {
    ...meaning,
    signs
  }
}

export function createMeaning(data: MeaningToDB): Meaning {
  const db = getDb()
  const meaning: Meaning = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO meaning (id, createdAt, wordId, context, notes)
    VALUES (@id, @createdAt, @wordId, @context, @notes)
  `
  ).run(toSqlParams(meaning))
  return meaning
}

export function updateMeaning(meaningId: string, data: Partial<MeaningToDB>): Meaning | undefined {
  const existing = findMeaningById(meaningId)
  if (!existing) return undefined

  const updated: Meaning = { ...existing, ...data }
  getDb()
    .prepare(
      `
    UPDATE meaning
    SET wordId = @wordId, context = @context, notes = @notes
    WHERE id = @id
  `
    )
    .run(toSqlParams(updated))
  return updated
}

export function deleteMeaningById(id: string): void {
  getDb().prepare('DELETE FROM meaning WHERE id = ?').run(id)
}

export function registerMeaningsHandlers(): void {
  ipcMain.handle('meaning:list', () => listAllMeanings())
  ipcMain.handle('meaning:find', (_e, meaningId: string) => findMeaningById(meaningId))
  ipcMain.handle('meaning:create', (_e, data: MeaningToDB) => createMeaning(data))
  ipcMain.handle('meaning:update', (_e, meaningId: string, data: Partial<MeaningToDB>) =>
    updateMeaning(meaningId, data)
  )
  ipcMain.handle('meaning:delete', (_e, meaningId: string) => deleteMeaningById(meaningId))
}
