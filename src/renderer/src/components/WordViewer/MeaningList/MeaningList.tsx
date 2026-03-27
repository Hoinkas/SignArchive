import './MeaningList.css'
import { WordWithMeaningsDetails } from '@shared/types'
import MeaningBox from './MeaningBox/MeaningBox'

interface MeaningListProps {
  wordDetails: WordWithMeaningsDetails
}

function MeaningList({ wordDetails }: MeaningListProps): React.JSX.Element {
  return (
    <div className="meaningList">
      {wordDetails.meanings.map((meaning, key) => (
        <MeaningBox key={key} meaningWithSigns={meaning} number={key} />
      ))}
    </div>
  )
}

export default MeaningList
