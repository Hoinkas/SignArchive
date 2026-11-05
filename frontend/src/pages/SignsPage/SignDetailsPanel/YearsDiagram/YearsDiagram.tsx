
import { useSign } from '@src/hooks/SignContext/useSign'
import { mergeYears } from '@src/utils/namesHelpers';
import './YearsDiagram.css'
import WordTimeline from './WordTimeline';

function YearsDiagram(): React.JSX.Element {
    const { sign } = useSign()

    const yearsByWord = new Object();

    sign.meanings.forEach((m) => {
        const years = m.sources.flatMap((s) => mergeYears(s.yearStart, s.yearEnd))

        m.words.forEach((w) => {
            if (w.name in Object.keys(yearsByWord)) yearsByWord[w.name] = [...yearsByWord[w.name], ...years]
            else yearsByWord[w.name] = years
        })
    })

    const words = Object.keys(yearsByWord)

    return (
        <div style={{ margin: 'var(--space-4)' }}>
            DIAGRAM CZASOWY:
            <div style={{ margin: '8px 0' }}>
                {words.map((w, i) => <WordTimeline key={i} word={w} years={yearsByWord[w]}/>)}
            </div>
        </div>
    )
}

export default YearsDiagram
