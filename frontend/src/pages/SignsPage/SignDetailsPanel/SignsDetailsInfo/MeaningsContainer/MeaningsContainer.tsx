
import { useSign } from '@src/hooks/SignContext/useSign'
import './MeaningsContainer.css'
import { useState } from 'react';
import type { IMeaningDetailed } from '@src/models/meaning.model';

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
                        {m.explanation}
                        {m.sources.map((s) => 
                            <div>
                                {s.id}
                                {s.notes}
                                {s.reference.fullName}
                                {s.regions.map((r) => r.name).join(', ')}
                                {s.yearStart}
                                {s.yearEnd}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MeaningsContainer
