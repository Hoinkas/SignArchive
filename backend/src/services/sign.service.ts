import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import {
  ISignAttached,
  ISignDetails,
  ISignDetailsToDB,
  ISign,
  ISignDetailsEdit
} from '../../../shared/models/sign.model'
import { IYearsRegions, IYearStartEnd } from '../../../shared/models/yearStartEnd.model'
import { getDefinitions, insertDefinition } from './definition.service'
import {
  createMedia,
  deleteUnusedMedia,
  findMediaById,
  findMediaBySignId,
  updateMedia
} from './media.service'

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
  return row ? (row as ISignAttached) : undefined
}

function findSignsByWordId(wordId: string): ISignAttached[] {
  return getDb()
    .prepare(
      `SELECT DISTINCT sign.* FROM sign
       INNER JOIN definitionSignWord ON sign.id = definitionSignWord.signId
       WHERE definitionSignWord.wordId = ?`
    )
    .all(wordId)
    .map((row) => row as ISignAttached)
}

function buildSignDetails(sign: ISignAttached, wordId: string): ISignDetails | undefined {
  const media = findMediaById(sign.mediaId)
  if (!media) return

  const { yearStart, yearEnd } = getYearsBySignWord(sign.id, wordId)
  return {
    ...sign,
    yearStart,
    yearEnd,
    sourcesCount: getSourcesCount(sign.id),
    definitions: getDefinitions(sign.id, wordId),
    regions: getRegionsBySignWord(sign.id, wordId),
    media
  }
}

export function getYearsRegionsBySignId(signId: string, wordId: string): IYearsRegions {
  const { yearStart, yearEnd } = getYearsBySignWord(signId, wordId)

  return {
    yearStart,
    yearEnd,
    regions: getRegionsBySignWord(signId, wordId)
  }
}

export function listSignsByWord(wordId: string): ISignDetails[] {
  const signs = findSignsByWordId(wordId)
  const signsDetails: ISignDetails[] = []

  signs.forEach((sign) => {
    const details = buildSignDetails(sign, wordId)
    if (details) signsDetails.push(details)
  })
  return signsDetails
}

export function insertSign(data: ISignDetailsToDB): ISignAttached {
  const existing = findMediaById(data.media.id)

  const media = existing ?? createMedia(data.media)

  const sign: ISignAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    mediaId: media.id,
    notes: data.notes
  }

  getDb()
    .prepare(
      'INSERT INTO sign (id, createdAt, mediaId, notes) VALUES (@id, @createdAt, @mediaId, @notes)'
    )
    .run(sign)

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
    const media = findMediaById(data.media.id) ?? createMedia(data.media)

    return {
      ...sign,
      yearStart: null,
      yearEnd: null,
      sourcesCount: 0,
      definitions: [definition],
      regions: [],
      media
    } satisfies ISignDetails
  })
  return transaction()
}

export function updateSign(
  signId: string,
  data: Partial<ISignDetailsEdit>
): ISignAttached | undefined {
  const existing = findSignById(signId)
  if (!data.media || !existing) return

  const oldMediaId = existing.mediaId

  if (data.media) updateMedia(data.media.id, data.media)

  const updated: ISignAttached = {
    ...existing,
    notes: data.notes ?? existing.notes,
    mediaId: data.media.id
  }

  getDb()
    .prepare(
      `UPDATE sign
       SET notes = @notes, mediaId = @mediaId
       WHERE id = @id`
    )
    .run({
      id: updated.id,
      notes: updated.notes ?? null,
      mediaId: updated.mediaId
    })

  if (oldMediaId && oldMediaId !== data.media.id) {
    deleteUnusedMedia(oldMediaId)
  }

  return updated
}

export function deleteSign(signId: string): void {
  const db = getDb()
  const sign = db.prepare('SELECT * FROM sign WHERE id = ?').get(signId) as
    | ISignAttached
    | undefined
  if (!sign) return

  db.prepare('DELETE FROM sign WHERE id = ?').run(signId)

  if (sign.mediaId) {
    deleteUnusedMedia(sign.mediaId)
  }
}
