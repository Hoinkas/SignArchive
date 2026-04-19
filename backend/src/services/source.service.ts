import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { findReferenceById } from './reference.service'
import { findRegionsBySourceId } from './region.service'
import {
  ISource,
  ISourceAttached,
  ISourceDetails,
  ISourceToDB,
  sourceTemplate
} from '../models/source.model'
import { fillMissingValues } from '../utils/helpers.functions'
import { IYearStartEnd } from '../models/yearStartEnd.model'
import { buildUpdateQuery } from '../utils/buildUpdateQuery'
import { createMeaningSourceLink } from './meaningSource.service'

// MAP DETAILS
function buildSourceDetails(source: ISourceAttached): ISourceDetails | undefined {
  const regions = findRegionsBySourceId(source.id)
  const reference = findReferenceById(source.referenceId)
  if (!reference) return undefined

  const { referenceId, ...rest } = source
  return { ...rest, reference, regions }
}

// RETURN YEARS
export function getStartEndYearBySignId(signId: string): IYearStartEnd {
  const row = getDb()
    .prepare(
      `SELECT MIN(source.yearStart) AS a, MAX(source.yearStart) AS b,
              MIN(source.yearEnd)   AS c, MAX(source.yearEnd)   AS d
       FROM source
       INNER JOIN meaningSource ON source.id = meaningSource.sourceId
       INNER JOIN meaning ON meaning.id = meaningSource.meaningId
       WHERE meaning.signId = ?
       `
    )
    .get(signId) as Record<string, number | null>

  const all = [row.a, row.b, row.c, row.d].filter((v): v is number => v !== null && v !== undefined)

  console.log(all)

  if (all.length === 0) return { yearStart: null, yearEnd: null }
  return { yearStart: Math.min(...all), yearEnd: Math.max(...all) }
}

// FIND
export function listSourcesByMeaningId(meaningId: string): ISourceDetails[] {
  const sources = getDb()
    .prepare(
      `SELECT source.* FROM source
       INNER JOIN meaningSource ON source.id = meaningSource.sourceId
       WHERE meaningSource.meaningId = ?`
    )
    .all(meaningId) as ISourceAttached[]

  return sources.flatMap((s) => {
    const details = buildSourceDetails(s)
    return details ? [details] : []
  })
}

// CREATE
function createSource(data: ISource): ISourceAttached {
  const source: ISourceAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    ...data
  }

  getDb()
    .prepare(
      `INSERT INTO source (id, createdAt, referenceId, yearStart, yearEnd, context)
        VALUES (@id, @createdAt, @referenceId, @yearStart, @yearEnd, @context)`
    )
    .run(fillMissingValues<ISourceToDB>(source, sourceTemplate))

  return source
}

export function createSourceWithMeaningLink(data: ISource, meaningId: string): ISourceDetails {
  const transaction = getDb().transaction(() => {
    const source = createSource(data)
    createMeaningSourceLink({ meaningId, sourceId: source.id })
    const reference = findReferenceById(source.referenceId)
    if (!reference) throw new Error('Reference not found')
    return { ...source, reference, regions: [] } satisfies ISourceDetails
  })
  return transaction()
}

// UPDATE
export function updateSource(sourceId: string, data: Partial<ISource>): void {
  buildUpdateQuery('source', sourceId, data as Record<string, unknown>)
}

// DELETE
export function deleteSource(sourceId: string): void {
  getDb().prepare('DELETE FROM source WHERE id = ?').run(sourceId)
}
