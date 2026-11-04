import { useSignList } from "@src/hooks/SignListContext/useSignList"
import './Statistics.css'
import { calculateStatistics } from "@src/utils/calculateStatistics"
import { useSearch } from "@src/hooks/SearchContext/useSearch"
import { mergeYearToText } from "@src/utils/namesHelpers"

function Statistics(): React.JSX.Element {
    const { allSigns, filteredSigns } = useSignList()
    const { region } = useSearch()

    const totalStats = calculateStatistics(allSigns)
    const filteredStats = calculateStatistics(filteredSigns)

    return (
        <div className="statisticsContainer">
            <div className="statisticsList two">
                <div>MIEJSCE { region ? '[' + region + ']' : "[Polska i reszta]"}</div>
                <div>LATA [{mergeYearToText(filteredStats.yearStartEnd)}]/[{mergeYearToText(totalStats.yearStartEnd)}]</div>
            </div>
            <div className="statisticsList three">
                <div>ZNAKI [{filteredStats.signsCount}]/[{totalStats.signsCount}]</div>
                <div>SŁOWA [{filteredStats.wordsCount}]/[{totalStats.wordsCount}]</div>
                <div>FILMY [{filteredStats.moviesCount}]/[{totalStats.moviesCount}]</div>
                <div>REGIONY [{filteredStats.regionsCount}]/[{totalStats.regionsCount}]</div>
                <div>KATEGORIE [{filteredStats.categoriesCount}]/[{totalStats.categoriesCount}]</div>
                <div>ŹRÓDŁA [{filteredStats.sourcesCount}]/[{totalStats.sourcesCount}]</div>
            </div>
        </div>
    )
}

export default Statistics
