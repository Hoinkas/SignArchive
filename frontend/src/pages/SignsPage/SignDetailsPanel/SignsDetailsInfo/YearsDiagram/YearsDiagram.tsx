
import { useSign } from '@src/hooks/SignContext/useSign'
import type { IYearStartEnd } from '@src/models/yearStartEnd.model';
import { mergeYears, mergeYearText } from '@src/utils/namesHelpers';
import './YearsDiagram.css'

function YearsDiagram(): React.JSX.Element {
    const { sign } = useSign()

    const yearsByWord = new Object();

    sign.meanings.forEach((m) => {
        const years = m.sources.map((s) => mergeYears(s.yearStart, s.yearEnd))

        m.words.forEach((w) => {
            if (w.name in Object.keys(yearsByWord)) yearsByWord[w.name] = [...yearsByWord[w.name], years]
            yearsByWord[w.name] = [years]
        })
    })

    const words = Object.keys(yearsByWord)

    return (
        <div style={{ margin: '8px' }}>
            DIAGRAM CZASOWY:
            <div style={{ margin: '8px 0' }}>
                {words.map((w) => (
                <div key={w} className='wordTimeContainer'>
                    <div>{w}</div>
                    <div className='linesContainer'>
                        <div className='line'/>

                        {yearsByWord[w].flatMap((y: IYearStartEnd[]) => y.map((item, i) => {
                            const yearDifference = item.yearEnd ? item.yearEnd - item.yearStart : 0
                            const widthPct = (yearDifference / (2026 - 1930)) * 100
                            const leftPct = ((item.yearStart - 1930) / (2026 - 1930)) * 100

                            return (
                                <div key={i} className='yearLine'  style={{
                                    left: `${leftPct}%`,
                                    width: `calc(${widthPct}% + 12px)`,
                                }}>
                                    <div className='yearText'>
                                        {mergeYearText(item)}
                                    </div>
                                </div>
                            )
                            })
                        )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YearsDiagram
