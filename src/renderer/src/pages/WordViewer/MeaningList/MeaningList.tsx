import './MeaningList.css'
import { Meaning, WordWithMeaningsDetails } from '@shared/types'
import MeaningBox from './MeaningBox/MeaningBox'

interface MeaningListProps {
  wordDetails: WordWithMeaningsDetails
  setMeaningValues: (meaning: Meaning) => void
}

function MeaningList({ wordDetails, setMeaningValues }: MeaningListProps): React.JSX.Element {
  return (
    <div className="meaningList">
      {wordDetails.meanings.map((meaning, key) => (
        <MeaningBox
          key={key}
          meaningWithSigns={meaning}
          number={key}
          setMeaningValues={setMeaningValues}
        />
      ))}
    </div>
  )
}

export default MeaningList
