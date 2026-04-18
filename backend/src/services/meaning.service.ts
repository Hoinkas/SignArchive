import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import {
  IMeaning,
  IMeaningAttached,
  IMeaningDetails,
  IMeaningToDB,
  meaningToDbTemplate
} from '../models/meaning.model'
import { fillMissingValues } from '../utils/helpers.functions'
import { listSourcesByMeaningId } from './source.service'
import { findWordsByMeaningId } from './word.service'
import { buildUpdateQuery } from '../utils/buildUpdateQuery'

// MAP DETAILS
function buildMeaningDetails(meaning: IMeaningAttached): IMeaningDetails | undefined {
  const sources = listSourcesByMeaningId(meaning.id)
  const words = findWordsByMeaningId(meaning.id)

  const { signId, ...rest } = meaning
  return { ...rest, sources, words }
}

// COUNT
export function countMeaningsBySingId(signId: string): number {
  const result = getDb()
    .prepare('SELECT COUNT(*) as count FROM meaning WHERE signId = ?')
    .get(signId) as { count: number }

  return result.count
}

// FIND
function allMeaningsBySignId(signId: string): IMeaningAttached[] {
  const meanings = getDb()
    .prepare('SELECT * FROM meaning WHERE signId = ?')
    .all(signId) as IMeaningAttached[]

  return meanings
}

export function allMeaningsDetailsBySignId(signId: string): IMeaningDetails[] {
  return allMeaningsBySignId(signId).flatMap((m) => {
    const details = buildMeaningDetails(m)
    return details ? [details] : []
  })
}

// CREATE
export function createMeaning(data: IMeaningToDB, signId: string): IMeaningAttached {
  const meaning: IMeaningAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    ...data,
    signId
  }

  getDb()
    .prepare(
      `INSERT INTO source (id, createdAt, explanation, signId)
         VALUES (@id, @createdAt, @explanation, @signId)`
    )
    .run(fillMissingValues<IMeaningToDB>(meaning, meaningToDbTemplate))

  return meaning
}

// UPDATE
export function updateMeaning(meaningId: string, data: Partial<IMeaning>): void {
  buildUpdateQuery('meaning', meaningId, data as Record<string, unknown>)
}

// DELETE
export function deleteMeaning(meaningId: string): void {
  getDb().prepare('DELETE FROM meaning WHERE id = ?').run(meaningId)
}
