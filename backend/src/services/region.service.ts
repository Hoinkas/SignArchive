import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IRegion, IRegionAttached, regionTemplate } from '../models/region.model'
import { fillMissingValues } from '../utils/helpers.functions'

// FIND
function findRegionByName(name: string): IRegionAttached | undefined {
  const row = getDb().prepare('SELECT * FROM region WHERE name = ?').get(name)
  return row ? (row as IRegionAttached) : undefined
}

export function findRegionsBySourceId(sourceId: string): IRegionAttached[] {
  const rows = getDb()
    .prepare(
      `SELECT * FROM region
    INNER JOIN regionSource ON region.id = regionSource.regionId
    WHERE regionSource.sourceId = ?`
    )
    .get(sourceId)
  return rows as IRegionAttached[]
}

// CREATE
function createRegion(data: IRegion): IRegionAttached {
  const db = getDb()

  const existing = findRegionByName(data.name)
  if (existing) return existing

  const region: IRegionAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    name: data.name
  }

  db.prepare('INSERT INTO region (id, createdAt, name) VALUES (@id, @createdAt, @name)').run(
    fillMissingValues<IRegion>(region, regionTemplate)
  )

  return { ...region }
}

export function createRegions(regions: IRegion[]): IRegionAttached[] {
  const transaction = getDb().transaction(() => {
    return regions.map((r) => createRegion(r))
  })

  return transaction()
}

// DELETE
function deleteRegion(regionId: string): void {
  getDb().prepare('DELETE FROM region WHERE id = ?').run(regionId)
}

export function deleteUnusedRegions(): void {
  const rows = getDb()
    .prepare(
      `SELECT * FROM region
    LEFT JOIN regionSource ON region.id = regionSource.regionId
    WHERE regionSource.regionId IS NULL
    `
    )
    .get() as IRegionAttached[]

  if (rows.length > 0) return

  rows.forEach((r) => deleteRegion(r.id))
}
