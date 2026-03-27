import './MeaningBox.css'
import { MeaningWithSignsDetails } from '@shared/types'
import VariantBox from './VariantBox/VariantBox'
import { useMemo } from 'react'

interface MeaningBoxProps {
  meaningWithSigns: MeaningWithSignsDetails
  number: number
}

function MeaningBox(props: MeaningBoxProps): React.JSX.Element {
  const { meaningWithSigns, number } = props
  const signs = meaningWithSigns.signs

  const years = useMemo(() => {
    const allSources = meaningWithSigns.signs.flatMap((sign) => sign.sources)
    const years = allSources.flatMap((s) => (s.yearStart != null ? [s.yearStart] : []))

    const yearStart = years.length > 0 ? Math.min(...years) : null
    const yearEnd = years.length > 0 ? Math.max(...years) : null

    if (yearStart && yearEnd) return yearStart + ' - ' + yearEnd
    return yearStart || yearEnd || 'brak roku'
  }, [meaningWithSigns.signs])

  return (
    <div className="meaningBox">
      <div className="meaningDetails">
        <div>
          Znaczenie {number + 1} - {meaningWithSigns.context}
        </div>
        <div className="regionAndDate"> {years} </div>
        <div> {meaningWithSigns.notes} </div>
      </div>
      <div className="variantList">
        {signs.map((sign, key) => (
          <VariantBox key={key} sign={sign} />
        ))}
      </div>
    </div>
  )
}

export default MeaningBox
