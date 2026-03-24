import './MeaningBox.css'
import { MeaningWithSigns } from '@shared/types'
import VariantBox from './VariantBox/VariantBox'

interface MeaningBoxProps {
  meaningWithSigns: MeaningWithSigns
  number: number
}

function MeaningBox({ meaningWithSigns, number }: MeaningBoxProps): React.JSX.Element {
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
      {signs.map((sign, key) => (
        <VariantBox key={key} sign={sign} />
      ))}
    </div>
  )
}

export default MeaningBox
