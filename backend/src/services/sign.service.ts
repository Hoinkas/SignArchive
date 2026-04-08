import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { ISignAttached, ISignDetails, ISignDetailsToDB, ISignFile, ISignToDB } from '../models/sign.model'
import { IYearStartEnd } from '../models/yearStartEnd.model'
import { getDefinitions, insertDefinition } from './definition.service'

export function rowToSign(row: Record<string, unknown>): ISignAttached {
  const file: ISignFile = {
    url: row.fileUrl as string,
    name: row.fileName as string,
    mediaType: row.fileMediaType as string,
  }
  return {
    id: row.id as string,
    createdAt: row.createdAt as number,
    notes: row.notes as string | undefined,
    file
  }
}

function getYearsBySignWord(signId: string, wordId: string): IYearStartEnd {
  const row = getDb()
    .prepare(
      `SELECT MIN(source.yearStart) AS a, MAX(source.yearStart) AS b,
              MIN(source.yearEnd)   AS c, MAX(source.yearEnd)   AS d
       FROM source
       INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
       WHERE sourceSignWord.signId = ? AND sourceSignWord.wordId = ?`
    )
    .get(signId, wordId) as Record<string, number | null>

  const all = [row.a, row.b, row.c, row.d].filter((v): v is number => v !== null)
  if (all.length === 0) return { yearStart: null, yearEnd: null }
  return { yearStart: Math.min(...all), yearEnd: Math.max(...all) }
}

function getRegionsBySignWord(signId: string, wordId: string): string[] {
  const rows = getDb()
    .prepare(
      `SELECT DISTINCT source.region FROM source
       INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
       WHERE sourceSignWord.signId = ? AND sourceSignWord.wordId = ?
         AND source.region IS NOT NULL`
    )
    .all(signId, wordId) as { region: string }[]
  return rows.map((r) => r.region)
}

function getSourcesCount(signId: string): number {
  const row = getDb()
    .prepare('SELECT COUNT(*) AS count FROM sourceSignWord WHERE signId = ?')
    .get(signId) as { count: number }
  return row.count
}

export function findSignById(id: string): ISignAttached | undefined {
  const row = getDb().prepare('SELECT * FROM sign WHERE id = ?').get(id)
  return row ? rowToSign(row as Record<string, unknown>) : undefined
}

function findSignsByWordId(wordId: string): ISignAttached[] {
  return getDb()
    .prepare(
      `SELECT DISTINCT sign.* FROM sign
       INNER JOIN definitionSignWord ON sign.id = definitionSignWord.signId
       WHERE definitionSignWord.wordId = ?`
    )
    .all(wordId)
    .map((row) => rowToSign(row as Record<string, unknown>))
}

function buildSignDetails(sign: ISignAttached, wordId: string): ISignDetails {
  const { yearStart, yearEnd } = getYearsBySignWord(sign.id, wordId)
  return {
    ...sign,
    yearStart,
    yearEnd,
    sourcesCount: getSourcesCount(sign.id),
    definitions: getDefinitions(sign.id, wordId),
    regions: getRegionsBySignWord(sign.id, wordId)
  }
}

export function listSignsByWord(wordId: string): ISignDetails[] {
  return findSignsByWordId(wordId).map((sign) => buildSignDetails(sign, wordId))
}

function insertSign(data: ISignDetailsToDB): ISignAttached {
  const sign: ISignAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    notes: data.notes,
    file: data.sign
  }

  getDb()
    .prepare(
      `INSERT INTO sign (id, createdAt, notes, fileUrl, fileName, fileMediaType)
       VALUES (@id, @createdAt, @notes, @fileUrl, @fileName, @fileMediaType)`
    )
    .run({
      id: sign.id,
      createdAt: sign.createdAt,
      notes: sign.notes ?? null,
      fileUrl: sign.file.url,
      fileName: sign.file.name ?? null,
      fileMediaType: sign.file.mediaType
    })

  return sign
}

export function createSignWithDefinition(data: ISignDetailsToDB): ISignDetails {
  const transaction = getDb().transaction(() => {
    const sign = insertSign(data)
    const definition = insertDefinition({
      ...data.definition,
      signId: sign.id,
      wordId: data.wordId
    })

    return {
      ...sign,
      yearStart: null,
      yearEnd: null,
      sourcesCount: 0,
      definitions: [definition],
      regions: []
    } satisfies ISignDetails
  })
  return transaction()
}

export function updateSign(signId: string, data: Partial<ISignToDB>): ISignAttached | undefined {
  const existing = findSignById(signId)
  if (!existing) return undefined

  const updatedFile: ISignFile = {
    url: data.fileUrl ?? existing.file.url,
    name: existing.file.name,
    mediaType: existing.file.mediaType,
  }

  const updated: ISignAttached = {
    ...existing,
    notes: data.notes ?? existing.notes,
    file: updatedFile
  }

  getDb()
    .prepare(
      `UPDATE sign
       SET notes = @notes, fileUrl = @fileUrl, fileName = @fileName,
           fileMediaType = @fileMediaType
       WHERE id = @id`
    )
    .run({
      id: updated.id,
      notes: updated.notes ?? null,
      fileUrl: updated.file.url,
      fileName: updated.file.name,
      fileMediaType: updated.file.mediaType
    })

  return updated
}

export function deleteSign(signId: string): void {
  getDb().prepare('DELETE FROM sign WHERE id = ?').run(signId)
}
