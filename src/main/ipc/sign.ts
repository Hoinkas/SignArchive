import { app, ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import path from 'path'
import fs from 'fs'
import type {
  DefinitionToDB,
  Sign,
  SignFile,
  SignToDB,
  SignDetails,
  SignDetailsToDB
} from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { getSourcesStartEndYearBySignAndWordId, returnSourcesCountBySignId } from './source'
import { handlerWithErrorLogging } from '../utils/errorHandler'
import { createDefinition, returnAllDefinitionsBySignWordId } from './definition'

const SIGNS_DIR = path.join(app.getPath('userData'), 'signs')
fs.mkdirSync(SIGNS_DIR, { recursive: true })

function copySignFile(signFile: SignFile): SignFile {
  const ext = path.extname(signFile.originalName)
  const destName = `${nanoid()}${ext}`
  const destPath = path.join(SIGNS_DIR, destName)

  fs.copyFileSync(signFile.path, destPath)

  return {
    ...signFile,
    path: destPath
  }
}

export function findSignById(id: string): Sign | undefined {
  const row = getDb().prepare('SELECT * FROM sign WHERE id = ?').get(id)
  return row ? rowToSign(row as Record<string, unknown>) : undefined
}

export function findAllSignsByWordId(wordId: string): Sign[] {
  const row = getDb()
    .prepare(
      `
      SELECT DISTINCT sign.* FROM sign
      INNER JOIN definitionSignWord ON sign.id = definitionSignWord.signId
      WHERE definitionSignWord.wordId = ?
    `
    )
    .all(wordId)

  return row as Sign[]
}

export function returnSignDetailsBySignWordId(
  signId: string,
  wordId: string
): SignDetails | undefined {
  const sign = findSignById(signId)
  if (!sign) return

  const { yearStart, yearEnd } = getSourcesStartEndYearBySignAndWordId(sign.id, wordId)
  const sourcesCount = returnSourcesCountBySignId(sign.id)
  const definitions = returnAllDefinitionsBySignWordId(signId, wordId)
  const places = returnAllPlacesBySignId(signId, wordId)

  return {
    ...sign,
    yearStart,
    yearEnd,
    sourcesCount,
    definitions,
    places
  }
}

export function returnSignsDetailsByWordId(wordId: string): SignDetails[] {
  const signs = findAllSignsByWordId(wordId)

  const signsDetails: SignDetails[] = []
  signs.forEach((s) => {
    const details = returnSignDetailsBySignWordId(s.id, wordId)
    if (!details) return
    signsDetails.push(details)
  })

  return signsDetails
}

export function createSign(data: SignToDB): Sign {
  const parsedFile = JSON.parse(data.file) as SignFile
  const signFile: SignFile = copySignFile(parsedFile)

  const sign: Sign = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data,
    file: signFile
  }
  getDb()
    .prepare(
      `
        INSERT INTO sign (id, createdAt, notes, file)
        VALUES (@id, @createdAt, @notes, @file)
      `
    )
    .run(toSqlParams({ ...sign, file: JSON.stringify(sign.file) }))
  return sign
}

export function createSignWithDefinition(signWithDetails: SignDetailsToDB): SignDetails {
  const { wordId, sign, definition } = signWithDetails

  const transaction = getDb().transaction(() => {
    const createdSign = createSign(sign)
    const definitionToDb: DefinitionToDB = {
      ...definition,
      signId: createdSign.id,
      wordId: signWithDetails.wordId
    }
    const createdDefinition = createDefinition(definitionToDb)

    const years = getSourcesStartEndYearBySignAndWordId(createdSign.id, wordId)

    return {
      ...createdSign,
      yearStart: years.yearStart ?? null,
      yearEnd: years.yearEnd ?? null,
      sourcesCount: 0,
      definitions: [createdDefinition]
    }
  })

  return transaction()
}

//TODO Add Partial and don't return Sing
export function updateSign(signId: string, data: SignToDB): Sign | undefined {
  const existing = findSignById(signId)
  if (!existing) return

  let newFile = existing.file

  if (data.file) {
    const file: SignFile = JSON.parse(data.file)

    if (file.path.startsWith(SIGNS_DIR)) {
      newFile = file
    } else {
      if (existing.file?.path && fs.existsSync(existing.file.path)) {
        fs.unlinkSync(existing.file.path)
      }
      newFile = copySignFile(file)
    }
  }

  const updated: Sign = {
    ...existing,
    notes: data.notes ?? existing.notes,
    file: newFile
  }

  getDb()
    .prepare(`UPDATE sign SET notes = @notes, file = @file WHERE id = @id`)
    .run(toSqlParams({ ...updated, file: JSON.stringify(updated.file) }))

  return updated
}

export function deleteSignById(id: string): void {
  getDb().prepare('DELETE FROM sign WHERE id = ?').run(id)
}

export function returnAllPlacesBySignId(signId: string, wordId: string): string[] {
  const rows = getDb()
    .prepare(
      `
        SELECT DISTINCT source.region FROM source
        INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
        WHERE sourceSignWord.wordId = ? AND sourceSignWord.signId = ?
      `
    )
    .all(wordId, signId)

  const result: string[] = []
  rows.forEach((r) => {
    if (r.region) result.push(r.region)
  })

  return result
}

export function registerSignHandlers(): void {
  ipcMain.handle('sign:list', (_, wordId: string) => returnSignsDetailsByWordId(wordId))
  ipcMain.handle('sign:create', async (_, data: SignDetailsToDB) =>
    handlerWithErrorLogging(() => createSignWithDefinition(data))
  )
  ipcMain.handle('sign:update', (_, singId: string, data: SignToDB) =>
    handlerWithErrorLogging(() => updateSign(singId, data))
  )
  ipcMain.handle('sign:delete', (_, id: string) =>
    handlerWithErrorLogging(() => deleteSignById(id))
  )
  ipcMain.handle('sign:years', (_, signId: string, wordId: string) =>
    handlerWithErrorLogging(() => getSourcesStartEndYearBySignAndWordId(signId, wordId))
  )
}

// ROW MAPPER
export function rowToSign(row: Record<string, unknown>): Sign {
  return {
    id: row.id as string,
    createdAt: row.createdAt as string,
    notes: row.notes as string | undefined,
    file: JSON.parse(row.file as string) as SignFile
  }
}
