import { IRegionAttached, IRegionToFE } from '@signarchive/shared/models/region.model';
import { getDb } from '../db/client'

function removeNullParentName(regions: IRegionToFE[]): IRegionToFE[] {
  return regions.map(r => {
      return r.parentName
      ? {id: r.id, name: r.name, parentName: r.parentName}
      : {id: r.id, name: r.name}
    })
}

// RETURN REGIONS' NAMES BY SIGN ID
export function listRegionsNamesBySignId(signId: string): IRegionToFE[] {
  const rows = getDb()
    .prepare(
      `SELECT DISTINCT
        r.id   AS id,
        r.name  AS name,
        pr.name AS parentName
      FROM region r
      LEFT JOIN region pr ON pr.id = r.parentRegionId
      INNER JOIN regionSource rs ON rs.regionId = r.id
      INNER JOIN source s ON s.id = rs.sourceId
      INNER JOIN meaningSource ms ON ms.sourceId = s.id
      INNER JOIN meaning m ON m.id = ms.meaningId
      WHERE m.signId = ?`
    )
    .all(signId) as IRegionToFE[];

    return removeNullParentName(rows);
}

// RETURN REGIONS' NAMES BY SOURCE ID
export function listRegionsNamesBySourceId(sourceId: string): IRegionToFE[] {
  const rows = getDb()
    .prepare(
      `SELECT DISTINCT
        r.id   AS id,
        r.name  AS name,
        pr.name AS parentName
      FROM region r
      LEFT JOIN region pr ON pr.id = r.parentRegionId
      INNER JOIN regionSource rs ON rs.regionId = r.id
      WHERE rs.sourceId = ?`
    )
    .all(sourceId) as IRegionToFE[];

    return removeNullParentName(rows);
}

// FIND
export function listAllRegions(): IRegionAttached[] {
  const rows = getDb().prepare('SELECT * FROM region').all() as IRegionAttached[]
  return rows
}