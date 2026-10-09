import { getDb } from '../db/client'
import { IRegionAttached } from '../models/region.model'

// RETURN NAMES
export function listRegionsNamesBySignId(signId: string): string[] {
  const rows = getDb()
    .prepare(
      `SELECT region.name FROM region
       INNER JOIN regionSource ON regionSource.regionId = region.id
       INNER JOIN source ON source.id = regionSource.sourceId
       INNER JOIN meaningSource ON meaningSource.sourceId = source.id
       INNER JOIN meaning ON meaning.id = meaningSource.meaningId
       WHERE meaning.signId = ?`
    )
    .all(signId) as { name: string }[]
  const removedDuplicates = new Set(rows.map((r) => r.name))
  return [...removedDuplicates]
}

// FIND
export function listAllRegions(): IRegionAttached[] {
  const row = getDb().prepare('SELECT * FROM region').all()
  return row as IRegionAttached[]
}