import type { IRegionToFE } from "@src/models/region.model"

export function removeDuplicates<T>(itemList: T[]): T[]{
    const s = new Set(itemList)
    return [...s]
}

export function removeRegionDuplicates(regions: IRegionToFE[]): IRegionToFE[]{
    return [...new Map(regions.map(i => [`${i.id}|${i.name}|${i.parentName}`, i])).values()];
}