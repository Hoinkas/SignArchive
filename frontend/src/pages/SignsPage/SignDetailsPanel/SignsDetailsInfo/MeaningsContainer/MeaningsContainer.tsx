
import { useSign } from '@src/hooks/SignContext/useSign'
import './MeaningsContainer.css'
import { useState } from 'react';
import type { IMeaningDetailed } from '@src/models/meaning.model';
import { mergeYearsToText } from '@src/utils/namesHelpers';

function MeaningsContainer(): React.JSX.Element {
    const { sign } = useSign()

    const meaningByWord = new Object();

    sign.meanings.forEach((m) => {
        m.words.forEach((w) => {
            if (w.name in Object.keys(meaningByWord)) meaningByWord[w.name] = [...meaningByWord[w.name], m]
            meaningByWord[w.name] = [m]
        })
    })

    const words = Object.keys(meaningByWord)

    const [activeWord, setActiveWord] = useState<string>(words[0])

    return (
        <div style={{margin: '20px 0 40px 0'}}>
            <div style={{display: 'flex'}}>
                {words.map((w) => {
                    const className = [
                    "wordTab",
                    activeWord === w ? " active" : "",
                    ].join("")

                    return <div className={className} onClick={() => setActiveWord(w)}>{w}</div>
                })}
            </div>
            <div className='wordDetails'>
                {meaningByWord[activeWord].map((m: IMeaningDetailed) => 
                    <div>
                        <div>WYJAŚNIENIE: {m.explanation}</div>
                        <div>
                            {m.sources.map((s) => 
                                <div>
                                    <div>NOTATKI: {s.notes}</div>
                                    <div>ŹRÓDŁO: {s.reference.name}</div>
                                    <div>ŹRÓDŁO: {s.reference.fullName}</div>
                                    <div>REGIONY: {s.regions.map((r) => r.name).join(', ')}</div>
                                    <div>LATA: {mergeYearsToText(s.yearStart, s.yearEnd)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MeaningsContainer
