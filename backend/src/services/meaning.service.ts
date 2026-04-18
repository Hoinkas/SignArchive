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

// MAP DETAILS
function buildMeaningDetails(meaning: IMeaningAttached): IMeaningDetails | undefined {
  const sources = listSourcesByMeaningId(meaning.id)
  const words = findWordsByMeaningId(meaning.id)

  const { signId, ...rest } = meaning
  return { ...rest, sources, words }
}

// FIND
function allSourcesBySignId(signId: string): IMeaningAttached[] {
  const sources = getDb()
    .prepare(
      `SELECT source.* FROM source
       WHERE signId = ?`
    )
    .all(signId) as IMeaningAttached[]

  return sources
}

export function allMeaningsDetailsBySignId(signId: string): IMeaningDetails[] {
  return allSourcesBySignId(signId).flatMap((s) => {
    const details = buildMeaningDetails(s)
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
      `INSERT INTO source (id, createdAt, explaination, signId)
         VALUES (@id, @createdAt, @explaination, @signId)`
    )
    .run(fillMissingValues<IMeaningToDB>(meaning, meaningToDbTemplate))

  return meaning
}

// UPDATE
export function updateMeaning(mediaId: string, data: Partial<IMeaning>): void {
  getDb()
    .prepare(
      `UPDATE source
       SET referenceId = @referenceId, yearStart = @yearStart, yearEnd = @yearEnd, context = @context
       WHERE id = @id`
    )
    .run({ id: mediaId, ...data })
}

// DELETE
export function deleteMeaning(sourceId: string): void {
  getDb().prepare('DELETE FROM source WHERE id = ?').run(sourceId)
}
