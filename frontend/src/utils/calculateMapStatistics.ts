import type { IRegionWords } from "@src/models/region.model";
import type { IWordAttached } from "@src/models/word.model";
import { removeWordsDuplicates } from "./removeDuplicates";

export interface IMapStats {
    regionName: string,
    signsCount: number
}

export interface IMapStatsTemp {
    [regionName: string]: IWordAttached[]
}

// TODO Change to Map instead of dictionary
export function assingWordsToRegions(regionWords: IRegionWords[]): IMapStatsTemp {
    const mapStatsTemp: IMapStatsTemp = {}
    
    regionWords.forEach((rw) => {
        const name = rw.region.parentName || rw.region.name
        mapStatsTemp[name] = removeWordsDuplicates([...mapStatsTemp[name] || [], ...rw.words])
    })

    return mapStatsTemp
} 

export function calculateSignCountForEachRegion(mapStatsTemp: IMapStatsTemp): IMapStats[]{
    return Object.keys(mapStatsTemp).map((s) => {
        return {regionName: s, signsCount: mapStatsTemp[s].length}
    })
}

export function calculateMapStatistics(regionWords: IRegionWords[]): IMapStats[] {
    const mapStatsTemp = assingWordsToRegions(regionWords)
    const mapStatistics = calculateSignCountForEachRegion(mapStatsTemp)

    return mapStatistics
}