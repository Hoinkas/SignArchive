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

// FIND
function findMeaningById(id: string): IMeaningAttached | undefined {
  return getDb().prepare('SELECT * FROM source WHERE id = ?').get(id) as
    | IMeaningAttached
    | undefined
}

function buildMeaningDetails(meaning: IMeaningAttached): IMeaningDetails | undefined {
  const sources = listSourcesByMeaningId(meaning.id)
  const words = findWordsByMeaningId(meaning.id)

  const { signId, ...rest } = meaning
  return { ...rest, sources, words }
}

export function listMeaningsDetailsBySignId(signId: string): IMeaningDetails[] {
  const sources = getDb()
    .prepare(
      `SELECT source.* FROM source
       WHERE signId = ?`
    )
    .all(signId) as IMeaningAttached[]

  return sources.flatMap((s) => {
    const details = buildMeaningDetails(s)
    return details ? [details] : []
  })
}

// CREATE
export function createMeaning(data: IMeaningToDB, signId: string): IMeaningAttached {
  const transaction = getDb().transaction(() => {
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
  })
  return transaction()
}

// UPDATE
export function updateMeaning(sourceId: string, data: IMeaning): IMeaningDetails | undefined {
  const existing = findMeaningById(sourceId)
  if (!existing) return undefined

  const updatedMeaning: IMeaningAttached = {
    ...existing,
    ...data
  }

  getDb()
    .prepare(
      `UPDATE source
       SET referenceId = @referenceId, yearStart = @yearStart, yearEnd = @yearEnd, context = @context
       WHERE id = @id`
    )
    .run(updatedMeaning)

  return buildMeaningDetails(updatedMeaning)
}

// DELETE
export function deleteMeaning(sourceId: string): void {
  getDb().prepare('DELETE FROM source WHERE id = ?').run(sourceId)
}
