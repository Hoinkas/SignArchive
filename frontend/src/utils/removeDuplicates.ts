import type { IRegionToFE } from "@src/models/region.model"
import type { IWordAttached } from "@src/models/word.model";
import type { IYearStartEnd } from "@src/models/yearStartEnd.model";

// export function removeDuplicates<T>(itemList: T[]): T[]{
//     const s = new Set(itemList)
//     return [...s]
// }

export function removeRegionDuplicates(regions: IRegionToFE[]): IRegionToFE[]{
    return [...new Map(regions.map(r => [`${r.id}|${r.name}|${r.parentName}`, r])).values()];
}

export function removeYearsDuplicates(years: IYearStartEnd[]): IYearStartEnd[]{
    return [...new Map(years.map(y => [`${y.yearStart}|${y.yearEnd}`, y])).values()];
}

export function removeWordsDuplicates(words: IWordAttached[]): IWordAttached[]{
    return [...new Map(words.map(w => [`${w.id}|${w.name}`, w])).values()]
}

interface IRenamedWords {
    [key: string]: IWordAttached[]
}

export function renameWordsDuplicates(words: IWordAttached[]): IWordAttached[]{
    const renamedWords: IRenamedWords = {}
    words.forEach(w => (renamedWords[w.name] ??= []).push(w))

    const renamedWordsList: IWordAttached[] = []
    Object.keys(renamedWords).forEach(rw => {
        return renamedWords[rw].length === 1
        ? renamedWordsList.push(renamedWords[rw][0])
        : renamedWords[rw].forEach((w,i) => renamedWordsList.push({...w, name: w.name + "_" + (i + 1)}))
    })

    return renamedWordsList
}