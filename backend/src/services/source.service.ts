import { ISourceToFE } from '@signarchive/shared/models/source.model'
import { getDb } from '../db/client'
import { ISourceAttached } from '../models/source.model'
import { IYearStartEnd } from '../models/yearStartEnd.model'
import { findReferenceById } from './reference.service'
import { listRegionsNamesBySourceId } from './region.service'

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
    ).get(signId) as Record<string, number | null>

  const all = [row.a, row.b, row.c, row.d].filter((v): v is number => v !== null && v !== undefined)

  if (all.length === 0) return { yearStart: null, yearEnd: null }
  return { yearStart: Math.min(...all), yearEnd: Math.max(...all) }
}

// FIND SIMPLE
export function getSimpleSourcesByMeaningId(meaningId: string): ISourceAttached[] {
  return getDb()
    .prepare(
      `SELECT * FROM source
       INNER JOIN meaningSource ON source.id = meaningSource.sourceId
       WHERE meaningSource.meaningId = ?
       `
    ).get(meaningId) as ISourceAttached[]
}

// FIND DETAILED
export function getDetailedSourceByMeaningId(meaningId: string): ISourceToFE[] {
  const sources = getSimpleSourcesByMeaningId(meaningId)
  const detailedSources = sources.map((s) => mapSimpleSourceDetailed(s))
  detailedSources.filter(item => item)
  
  return detailedSources as ISourceToFE[];
}

// MAP SIMPLE SOURCE TO DETAILED
function mapSimpleSourceDetailed(source: ISourceAttached): ISourceToFE | undefined {
  const regions = listRegionsNamesBySourceId(source.id)
  const reference = findReferenceById(source.referenceId)
  if (!reference) return

  return {...source, regions, reference}
}