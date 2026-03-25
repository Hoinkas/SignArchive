import './MeaningBox.css'
import { MeaningWithSigns, SignWithSourceSignerMediaFile } from '@shared/types'
import VariantBox from './VariantBox/VariantBox'
import { Dispatch, SetStateAction } from 'react'

interface MeaningBoxProps {
  meaningWithSigns: MeaningWithSigns
  number: number
  isComparsionActive: boolean
  activeSigns: SignWithSourceSignerMediaFile[]
  setActiveSigns: Dispatch<SetStateAction<SignWithSourceSignerMediaFile[]>>
}

function MeaningBox(props: MeaningBoxProps): React.JSX.Element {
  const { meaningWithSigns, number, isComparsionActive, activeSigns, setActiveSigns } = props
  const signs = meaningWithSigns.signs
  const meaning = meaningWithSigns.meaning

  const yearStart = meaning.yearStart
  const yearEnd = meaning.yearEnd
  let years = (yearStart || yearEnd || 'brak roku').toString()
  if (yearStart && yearEnd) years = yearStart + ' - ' + yearEnd

  return (
    <div className="meaningBox">
      <div className="meaningDetails">
        <div>
          Znaczenie {number + 1} - {meaning.context}
        </div>
        <div className="regionAndDate">
          {meaning.region || 'Ogólnopolski'} · {years}
        </div>
      </div>
      <div className="variantList">
        {signs.map((sign, key) => (
          <VariantBox
            key={key}
            sign={sign}
            isComparsionActive={isComparsionActive}
            activeSigns={activeSigns}
            setActiveSigns={setActiveSigns}
          />
        ))}
      </div>
    </div>
  )
}

export default MeaningBox
