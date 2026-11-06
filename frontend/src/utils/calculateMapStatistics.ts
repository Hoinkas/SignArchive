import type { IRegionWords } from "@src/models/region.model";

export interface IMapStats {
    name: string,
    signsCount: number
}

interface IMapStatsTemp {
    [name: string]: number
}

export function calculateMapStatistics(regionWords: IRegionWords[]) {
    const mapStatsTemp: IMapStatsTemp = {}
    
    regionWords.forEach((rw) => {
        const name = rw.region.parentName || rw.region.name
        mapStatsTemp[name] = (mapStatsTemp[name] || 0) + rw.words.length
    })

    const mapStatistics: IMapStats[] = Object.keys(mapStatsTemp).map((s) => {
        const mapStats: IMapStats = {name: s, signsCount: mapStatsTemp[s]}
        return mapStats
    })

    return mapStatistics
}