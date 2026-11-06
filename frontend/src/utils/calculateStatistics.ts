import type { ISignSimple } from "@src/models/sign.model"
import type { IYearStartEnd } from "@src/models/yearStartEnd.model"

export interface IStatistics {
    signsCount: number,
    regionsCount: number,
    moviesCount: number,
    wordsCount: number,
    categoriesCount: number,
    sourcesCount: number
    yearStartEnd: IYearStartEnd
}

export function calculateStatistics(signList: ISignSimple[]) {
    const statistics: IStatistics = {
        signsCount: signList.length,
        regionsCount: [...new Set(signList.flatMap((s) => s.regions.flatMap((r) => r.name)))].length,
        moviesCount: [...new Set(signList.flatMap((s) => s.media))].length,
        wordsCount: [...new Set(signList.flatMap((s) => s.words))].length,
        categoriesCount: 0,
        sourcesCount: 0,
        yearStartEnd: returnMarginalYears(signList.flatMap((s) => s.years))
    }
 
    return statistics
};

export function returnMarginalYears(years: IYearStartEnd[]): IYearStartEnd {
    const allYears = years
        .flatMap((y) => [y.yearStart, y.yearEnd])
        .filter((y): y is number => y != null && isFinite(y));

    const yearsMarginal: IYearStartEnd = {
        yearStart: allYears.length > 0 ? Math.min(...allYears) : null,
        yearEnd: allYears.length > 0 ? Math.max(...allYears) : null
    }
    return yearsMarginal
}