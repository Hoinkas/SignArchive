import { getDb } from '../db/client'
import { IRegionAttached } from '../models/region.model'
import { IRegionSource } from '../models/regionSource.model'
import { deleteUnusedRegions } from './region.service'

// CREATE
function createRegionSourceLink(link: IRegionSource): void {
  getDb()
    .prepare('INSERT INTO regionSource (regionId, sourceId) VALUES (@regionId, @sourceId)')
    .run(link)
}

function createRegionSourceLinks(links: IRegionSource[]): void {
  const transaction = getDb().transaction(() => {
    links.map((l) => createRegionSourceLink(l))
  })

  transaction()
}

export function mapRegionsSourceIdLinks(regions: IRegionAttached[], sourceId: string): void {
  const links: IRegionSource[] = regions.map((r) => {
    return { sourceId, regionId: r.id }
  })
  createRegionSourceLinks(links)
  deleteUnusedRegions()
}
