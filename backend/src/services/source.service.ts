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
  sourceTemplate,
  sourceToDBTemplate
} from '../models/source.model'
import { fillMissingValues } from '../utils/helpers.functions'
import { mapRegionsSourceIdLinks } from './regionSource.service'

// FIND
function findSourceById(id: string): ISourceAttached | undefined {
  return getDb().prepare('SELECT * FROM source WHERE id = ?').get(id) as ISourceAttached | undefined
}

function buildSourceDetails(source: ISourceAttached): ISourceDetails | undefined {
  const regions = findRegionsBySourceId(source.id)
  const reference = findReferenceById(source.referenceId)
  if (!reference) return undefined

  const { referenceId, ...rest } = source
  return { ...rest, reference, regions }
}

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
export function createSourceWithDetails(data: ISourceWithDetailsToDB): ISourceDetails {
  const transaction = getDb().transaction(() => {
    const reference = createReference(data.reference)

    const source: ISourceAttached = {
      id: nanoid(),
      createdAt: Date.now(),
      ...data.source,
      referenceId: reference.id
    }

    getDb()
      .prepare(
        `INSERT INTO source (id, createdAt, referenceId, yearStart, yearEnd, context)
         VALUES (@id, @createdAt, @referenceId, @yearStart, @yearEnd, @context)`
      )
      .run(fillMissingValues<ISourceToDB>(source, sourceToDBTemplate))

    const regions = createRegions(data.regions)
    mapRegionsSourceIdLinks(regions, source.id)

    const { referenceId, ...rest } = source
    return { ...rest, reference, regions } satisfies ISourceDetails
  })
  return transaction()
}

// UPDATE
export function updateSource(
  sourceId: string,
  data: ISourceWithDetailsToDB
): ISourceDetails | undefined {
  const existing = findSourceById(sourceId)
  if (!existing) return undefined

  const referenceId = data.reference ? createReference(data.reference).id : existing.referenceId

  const updatedSource: ISourceAttached = {
    ...existing,
    ...data.source,
    referenceId
  }

  getDb()
    .prepare(
      `UPDATE source
       SET referenceId = @referenceId, yearStart = @yearStart, yearEnd = @yearEnd, context = @context
       WHERE id = @id`
    )
    .run(fillMissingValues<ISource>(updatedSource, sourceTemplate))

  const regions = createRegions(data.regions)
  mapRegionsSourceIdLinks(regions, updatedSource.id)

  return buildSourceDetails(updatedSource)
}

// DELETE
export function deleteSource(sourceId: string): void {
  getDb().prepare('DELETE FROM source WHERE id = ?').run(sourceId)
}
