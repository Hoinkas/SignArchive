import { useSignList } from "@src/hooks/SignListContext/useSignList"
import './Statistics.css'
import { calculateStatistics } from "@src/utils/calculateStatistics"

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
