
import './MeaningItem.css'
import type { IMeaningDetailed } from '@src/models/meaning.model';
import SourceItem from './SourceItem/SourceItem';

interface IProps {
  meaning: IMeaningDetailed
}

function MeaningItem({meaning}: IProps): React.JSX.Element {
	return (
    <div className="meaningItem">
      <div className='meaningText'>WYJAŚNIENIE: {meaning.explanation}</div>
      <div className='meaningText'>ŹRÓDŁA: </div>
      <div className="sourcesContainer">
        {meaning.sources.map((s, i) => <SourceItem key={i} index={i} source={s}/>)}
      </div>
    </div>
	)
}

export default MeaningItem
