import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IRegion, IRegionAttached, regionTemplate } from '../models/region.model'
import { fillMissingValues } from '../utils/helpers.functions'
import { createRegionSourceLink } from './regionSource.service'

// FIND
function findRegionByName(name: string): IRegionAttached | undefined {
  const row = getDb().prepare('SELECT * FROM region WHERE name = ?').get(name)
  return row ? (row as IRegionAttached) : undefined
}

export function findRegionsBySourceId(sourceId: string): IRegionAttached[] {
  return getDb()
    .prepare(
      `SELECT region.* FROM region
       INNER JOIN regionSource ON region.id = regionSource.regionId
       WHERE regionSource.sourceId = ?`
    )
    .all(sourceId) as IRegionAttached[]
}

export function listAllRegions(): IRegionAttached[] {
  const row = getDb().prepare('SELECT * FROM region').all()
  return row as IRegionAttached[]
}

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

  return rows.map((r) => r.name)
}

// CREATE
function createRegion(data: IRegion): IRegionAttached {
  const existing = findRegionByName(data.name)
  if (existing) return existing

  const region: IRegionAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    name: data.name
  }

  getDb()
    .prepare('INSERT INTO region (id, createdAt, name) VALUES (@id, @createdAt, @name)')
    .run(fillMissingValues<IRegion>(region, regionTemplate))

  return region
}

export function createRegionAndLink(sourceId: string, data: IRegion): IRegionAttached {
  const transaction = getDb().transaction(() => {
    const region = createRegion(data)
    createRegionSourceLink({ sourceId, regionId: region.id })
    return region
  })
  return transaction()
}

export function createRegionsAndLink(sourceId: string, regions: IRegion[]): IRegionAttached[] {
  const transaction = getDb().transaction(() => {
    return regions.map((r) => {
      const region = createRegion(r)
      createRegionSourceLink({ sourceId, regionId: region.id })
      return region
    })
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
      `SELECT region.* FROM region
       LEFT JOIN regionSource ON region.id = regionSource.regionId
       WHERE regionSource.regionId IS NULL`
    )
    .all() as IRegionAttached[]

  rows.forEach((r) => deleteRegion(r.id))
}

export function deleteRegionFromSource(sourceId: string, regionId: string): void {
  getDb()
    .prepare('DELETE FROM regionSource WHERE sourceId = ? AND regionId = ?')
    .run(sourceId, regionId)
  deleteUnusedRegions()
}
