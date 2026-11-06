
import { useSign } from '@src/hooks/SignContext/useSign'
import { mergeYears } from '@src/utils/namesHelpers';
import './YearsDiagram.css'
import WordTimeline from './WordTimeline';
import type { IYearStartEnd } from '@src/models/yearStartEnd.model';
import { useMemo } from 'react';

interface TimelineRow {
    word: string
    years: IYearStartEnd[]
}

function YearsDiagram(): React.JSX.Element {
    const { sign } = useSign()

    const rows = useMemo(() => {
        if (!sign) return []

        const yearsByWord = new Map<string, TimelineRow[]>();

        sign.meanings.forEach((m) => {
            const years = m.sources.flatMap((s) => mergeYears(s.yearStart, s.yearEnd))

            m.words.forEach(w => {
                const entries = yearsByWord.get(w.name) ?? []
                entries.push({word: w.name, years })
                yearsByWord.set(w.name, entries)
            })
        })

        return [...yearsByWord.values()].flatMap((entries) => 
            entries.length === 1 ?
            entries :
            entries.map((e, i) => ({ ...e, word: `${e.word}_${i + 1}` }))
        )
    }, [sign])

    if (!sign) return <></>

    return (
        <div style={{ margin: 'var(--space-4)' }}>
            DIAGRAM CZASOWY:
            <div style={{ margin: 'var(--space-2) 0' }}>
                {rows.map((w, i) => <WordTimeline key={i} word={w.word} years={w.years}/>)}
            </div>
        </div>
    )
}

export default YearsDiagram
