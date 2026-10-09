import type { ISignSimple } from "@src/models/sign.model"

export interface IStatistics {
    signsCount: number,
    regionsCount: number,
    moviesCount: number,
    wordsCount: number,
    categoriesCount: number,
    sourcesCount: number
}

export function calculateStatistics(signList: ISignSimple[]) {
    const statistics: IStatistics = {
        signsCount: signList.length,
        regionsCount: [...new Set(signList.flatMap((s) => s.regions.flatMap((r) => r.name)))].length,
        moviesCount: [...new Set(signList.flatMap((s) => s.media))].length,
        wordsCount: [...new Set(signList.flatMap((s) => s.words))].length,
        categoriesCount: 0,
        sourcesCount: 0
    }
 
    return statistics
};