import type { IWordAttached } from "@src/models/word.model";
import { removeSignsDuplicates, removeWordsDuplicates } from "./removeDuplicates";
import type { ISignDetailed, ISignSimple } from "@src/models/sign.model";
import type { IRegionToFE } from "@src/models/region.model";

export interface IRegionItems<T> {
  region: IRegionToFE,
  items: T[]
}

export interface IMapStatsTemp<T> {
    [regionName: string]: T[]
}

export function groupItemsByRegion<T>(
    regionItems: IRegionItems<T>[],
    removeDuplicates: (items: T[]) => T[]
): IMapStatsTemp<T> {
    const result: IMapStatsTemp<T> = {}
    
    for (const { region, items } of regionItems) {
        const name = region.parentName || region.name
        result[name] = removeDuplicates([...(result[name] ?? []), ...items])
    }

    return result
} 

export interface IMapStats {
    regionName: string,
    count: number
}

export function calculateCountForEachRegion(mapStatsTemp: IMapStatsTemp<unknown>): IMapStats[]{
    return Object.entries(mapStatsTemp).map(([regionName, items]) => ({regionName, count: items.length}))
}

export function calculateMapStatistics<TSource, TItem>(
    source: TSource,
    mapToRegionItems: (source: TSource) => IRegionItems<TItem>[],
    removeDuplicates: (items: TItem[]) => TItem[]
): IMapStats[] {
    const regionItems = mapToRegionItems(source)
    const mapStatsTemp = groupItemsByRegion(regionItems, removeDuplicates)

    return calculateCountForEachRegion(mapStatsTemp)
}

//DETAILED SIGN STATISTICS - WORD MAP
export function mapDetailedSignsToWordsAndRegions(signs: ISignDetailed[]): IRegionItems<IWordAttached>[] {    
    return signs.flatMap(sign => 
        sign.meanings.flatMap(meaning => 
            meaning.sources.flatMap(source => 
                source.regions.map(region => ({region, items: meaning.words})
            ))))
}

export function calculateWordsMapStatistics(signs: ISignDetailed[]): IMapStats[] {
    return calculateMapStatistics(signs, mapDetailedSignsToWordsAndRegions, removeWordsDuplicates)
}

//SIMPLE SIGN STATISTICS - SIGN MAP

export function mapSimpleSignToSignsAndRegions(signs: ISignSimple[]): IRegionItems<ISignSimple>[] {
    return signs.flatMap(sign => sign.regions.map(region => ({ region, items: [sign] })))
}

export function calculateSignsMapStatistics(signs: ISignSimple[]): IMapStats[] {
    return calculateMapStatistics(signs, mapSimpleSignToSignsAndRegions, removeSignsDuplicates)
}