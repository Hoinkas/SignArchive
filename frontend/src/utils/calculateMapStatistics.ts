import type { IRegionToFE } from "@src/models/region.model";

export interface IMapStats {
    name: string,
    signsCount: number
}

interface IMapStatsTemp {
    [name: string]: number
}

export function calculateMapStatistics(regions: IRegionToFE[]) {
    const mapStatsTemp: IMapStatsTemp = {}
    
    regions.forEach((r) => {
        const name = r.parentName || r.name
        mapStatsTemp[name] = (mapStatsTemp[name] || 0) + 1
    })

    const mapStatistics: IMapStats[] = Object.keys(mapStatsTemp).map((s) => {
        const mapStats: IMapStats = {name: s, signsCount: mapStatsTemp[s]}
        return mapStats
    })

    return mapStatistics
}