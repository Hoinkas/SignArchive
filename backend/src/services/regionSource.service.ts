import { getDb } from '../db/client'
import { IRegionAttached } from '../models/region.model'
import { IRegionSource } from '../models/regionSource.model'
import { deleteUnusedRegions } from './region.service'

// CREATE
export function createRegionSourceLink(link: IRegionSource): void {
  getDb()
    .prepare('INSERT INTO regionSource (regionId, sourceId) VALUES (@regionId, @sourceId)')
    .run(link)
}
