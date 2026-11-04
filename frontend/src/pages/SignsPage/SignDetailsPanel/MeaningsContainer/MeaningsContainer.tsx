
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
        <div style={{marginBottom: '20px'}}>
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
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                        <div>WYJAŚNIENIE: {m.explanation}</div>
                        ŹRÓDŁA: 
                        <div style={{display: 'flex', gap: '8px'}}>
                            {m.sources.map((s) => 
                                <div className='details'>
                                    <div>NOTATKI: {s.notes}</div>
                                    <div>ŹRÓDŁO: {s.reference.name}</div>
                                    <div className='detailsManyInRow'>
                                        
                                        <div>LATA: {mergeYearsToText(s.yearStart, s.yearEnd)}</div>
                                        <div>REGIONY: {s.regions.map((r) => r.name).join(', ')}</div>
                                    </div>
                                    <div>PEŁNE ŹRÓDŁO: {s.reference.fullName}</div>
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
