
import './MeaningsContainer.css'
import type { IMeaningDetailed } from '@src/models/meaning.model';
import SourceItem from './SourceItem';

interface IProps {
  meaning: IMeaningDetailed
}

function MeaningItem({meaning}: IProps): React.JSX.Element {
	return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <div>WYJAŚNIENIE: {meaning.explanation}</div>
      ŹRÓDŁA: 
      <div style={{display: 'flex', gap: '8px', alignItems: 'stretch'}}>
        {meaning.sources.map((s, i) => <SourceItem key={i} index={i} source={s}/>)}
      </div>
    </div>
	)
}

export default MeaningItem
