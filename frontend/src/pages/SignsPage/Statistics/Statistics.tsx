import { useSignList } from "@src/hooks/SignListContext/useSignList"
import './Statistics.css'
import type { ISignSimple } from "@src/models/sign.model"

interface IStatistics {
    signsCount: number,
    regionsCount: number,
    moviesCount: number,
    wordsCount: number,
    categoriesCount: number,
    sourcesCount: number
}

function calculateStatistics(signList: ISignSimple[]) {
    const statistics: IStatistics = {
        signsCount: signList.length,
        regionsCount: [...new Set(signList.flatMap((s) => s.regions))].length,
        moviesCount: [...new Set(signList.flatMap((s) => s.media))].length,
        wordsCount: [...new Set(signList.flatMap((s) => s.words))].length,
        categoriesCount: 0,
        sourcesCount: 0
    }
 
    return statistics
};

function Statistics(): React.JSX.Element {
    const { allSigns, filteredSigns } = useSignList()

    const totalStats = calculateStatistics(allSigns)
    const filteredStats = calculateStatistics(filteredSigns)

    return (
        <div className="statisticsContainer">
            <div>Miejsce: [Polska i reszta]</div>
            <div className="statisticsList">
                <div>Znaki [{filteredStats.signsCount}/{totalStats.signsCount}]</div>
                <div>Słowa [{filteredStats.wordsCount}/{totalStats.wordsCount}]</div>
                <div>Filmy [{filteredStats.moviesCount}/{totalStats.moviesCount}]</div>
                <div>Regiony [{filteredStats.regionsCount}/{totalStats.regionsCount}]</div>
                <div>Kategorie [{filteredStats.categoriesCount}/{totalStats.categoriesCount}]</div>
                <div>Źródła [{filteredStats.sourcesCount}/{totalStats.sourcesCount}]</div>
            </div>
        </div>
    )
}

export default Statistics
