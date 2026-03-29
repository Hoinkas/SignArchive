import './MeaningList.css'
import { Meaning, SignWithSourceDetails, WordWithMeaningsDetails } from '@shared/types'
import MeaningBox from './MeaningBox/MeaningBox'

interface MeaningListProps {
  wordDetails: WordWithMeaningsDetails
  setMeaningValues: (meaning: Meaning) => void
  setSignValues: (meaningId: string, sign: SignWithSourceDetails) => void
}

function MeaningList(props: MeaningListProps): React.JSX.Element {
  const { wordDetails, setMeaningValues, setSignValues } = props

  return (
    <div className="meaningList">
      {wordDetails.meanings.map((meaning, key) => (
        <MeaningBox
          key={key}
          meaningWithSigns={meaning}
          number={key}
          setMeaningValues={setMeaningValues}
          setSignValues={setSignValues}
        />
      ))}
    </div>
  )
}

export default MeaningList
