import { getDb } from '../db/client'
import { IYearStartEnd } from '../models/yearStartEnd.model'

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

  if (all.length === 0) return { yearStart: null, yearEnd: null }
  return { yearStart: Math.min(...all), yearEnd: Math.max(...all) }
}