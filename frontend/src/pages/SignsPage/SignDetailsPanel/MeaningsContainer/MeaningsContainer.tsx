
import { useSign } from '@src/hooks/SignContext/useSign'
import './MeaningsContainer.css'
import { useMemo, useState } from 'react';
import type { IMeaningDetailed } from '@src/models/meaning.model';
import WordsTabs from './WordsTabs';
import MeaningItem from './MeaningItem';

interface MeaningItemI {
	word: string
	meaning: IMeaningDetailed
}

function MeaningsContainer(): React.JSX.Element {
	const { sign } = useSign()

	const rows = useMemo<MeaningItemI[]>(() => {
		if (!sign) return []

		const meaningsByWord = new Map<string, IMeaningDetailed[]>();

		sign.meanings.forEach((m) => {
			m.words.forEach((w) => {
				const entries = meaningsByWord.get(w.name) ?? []
				meaningsByWord.set(w.name, [...entries, m])
			})
		})
			
		return [...meaningsByWord].flatMap(([word, meanings]) =>
			meanings.length === 1
				? [{ word: word, meaning: meanings[0] }]
				: meanings.map((meaning, i) => ({ word: `${word}_${i + 1}`, meaning }))
		)
	}, [sign])

	const words = [...rows].map(r => r.word)
	const [activeWord, setActiveWord] = useState<string>(words[0])

	if (!sign) return <></>

	return (
		<div>
			<WordsTabs words={words} activeWord={activeWord} setActiveWord={setActiveWord}/>
			<div className='wordDetails'>
				{rows.map((r,i) => {
					if (r.word == activeWord) return <MeaningItem key={i} meaning={r.meaning}/>
				})}
			</div>
		</div>
	)
}

export default MeaningsContainer
