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

interface RenamedWordsI {
    [key: string]: IWordAttached[]
}

export function renameWordsDuplicates(words: IWordAttached[]): IWordAttached[]{
    const renamedWords: RenamedWordsI = {}
    words.forEach(w => (renamedWords[w.name] ??= []).push(w))

    const renamedWordsList: IWordAttached[] = []
    Object.keys(renamedWords).forEach(rw => {
        if (renamedWords[rw].length === 1) renamedWordsList.push(renamedWords[rw][0])
        else renamedWords[rw].forEach((w,i) => renamedWordsList.push({...w, name: w.name + "_" + (i + 1)}))
    })

    return renamedWordsList
}