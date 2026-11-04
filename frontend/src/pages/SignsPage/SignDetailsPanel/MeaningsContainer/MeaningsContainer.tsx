
import { useSign } from '@src/hooks/SignContext/useSign'
import './MeaningsContainer.css'
import { useState, type Key } from 'react';
import type { IMeaningDetailed } from '@src/models/meaning.model';
import WordsTabs from './WordsTabs';
import MeaningItem from './MeaningItem';

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
			<WordsTabs words={words} activeWord={activeWord} setActiveWord={setActiveWord}/>
			<div className='wordDetails'>
				{meaningByWord[activeWord].map((m: IMeaningDetailed, i: Key) => <MeaningItem key={i} meaning={m}/>)}
			</div>
		</div>
	)
}

export default MeaningsContainer
