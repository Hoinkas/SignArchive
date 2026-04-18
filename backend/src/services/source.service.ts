import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { createReference, findReferenceById } from './reference.service'
import { createRegions, findRegionsBySourceId } from './region.service'
import {
  ISource,
  ISourceAttached,
  ISourceDetails,
  ISourceToDB,
  ISourceWithDetailsToDB,
  sourceTemplate
} from '../models/source.model'
import { fillMissingValues } from '../utils/helpers.functions'
import { mapRegionsSourceIdLinks } from './regionSource.service'
import { IYearStartEnd } from '../models/yearStartEnd.model'

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

  const all = [row.a, row.b, row.c, row.d].filter((v): v is number => v !== null)

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

export function createSourceWithDetails(data: ISourceWithDetailsToDB): ISourceDetails {
  const transaction = getDb().transaction(() => {
    const reference = createReference(data.reference)
    const source = createSource({ ...data.source, referenceId: reference.id })

    const regions = createRegions(data.regions)
    mapRegionsSourceIdLinks(regions, source.id)

    const { referenceId, ...rest } = source
    return { ...rest, reference, regions } satisfies ISourceDetails
  })
  return transaction()
}

// UPDATE
export function updateSource(sourceId: string, data: Partial<ISource>): void {
  getDb()
    .prepare(
      `UPDATE source
       SET referenceId = @referenceId, yearStart = @yearStart, yearEnd = @yearEnd, context = @context
       WHERE id = @id`
    )
    .run({ id: sourceId, ...data })
}

// DELETE
export function deleteSource(sourceId: string): void {
  getDb().prepare('DELETE FROM source WHERE id = ?').run(sourceId)
}
