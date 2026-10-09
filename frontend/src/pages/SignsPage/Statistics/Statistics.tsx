import { useSignList } from "@src/hooks/SignListContext/useSignList"
import './Statistics.css'

function Statistics(): React.JSX.Element {
    const { signList } = useSignList()

    const regionsCount = signList.filter((s) => s.regions.length !== 0).length
    const moviesCount = signList.filter((s) => s.media.length !== 0).length
    const wordsCount = signList.filter((s) => s.words.length !== 0).length

    return (
        <div className="statisticsContainer">
            <div>Miejsce: [Polska i reszta]</div>
            <div className="statisticsList">
                <div>Znaki [{signList.length}]</div>
                <div>Regiony [{regionsCount}]</div>
                <div>Filmy [{moviesCount}]</div>
                <div>Słowa [{wordsCount}]</div>
                <div>Kategorie [{wordsCount}]</div>
                <div>Źródła [{wordsCount}]</div>
            </div>
        </div>
    )
}

export default Statistics
