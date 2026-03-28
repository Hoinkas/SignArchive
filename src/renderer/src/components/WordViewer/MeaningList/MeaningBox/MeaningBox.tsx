import './MeaningBox.css'
import { Meaning, MeaningWithSignsDetails } from '@shared/types'
import VariantBox from './VariantBox/VariantBox'
import { useMemo, useState } from 'react'
import MeaningForm from '../../MeaningForm/MeaningForm'
import ActionButton from '@renderer/components/ActionButton/ActionButton'

interface MeaningBoxProps {
  meaningWithSigns: MeaningWithSignsDetails
  number: number
  setMeaningValues: (meaning: Meaning) => void
}

function MeaningBox(props: MeaningBoxProps): React.JSX.Element {
  const { meaningWithSigns, number, setMeaningValues } = props
  const signs = meaningWithSigns.signs
  const [isFormOpen, setIsFormOpen] = useState(false)

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
      {isFormOpen && (
        <MeaningForm
          meaning={meaningWithSigns}
          setMeaningValues={setMeaningValues}
          formType="edit"
          setIsFormOpen={setIsFormOpen}
        />
      )}
      <div className="meaningDetails">
        <div>
          <div>
            Znaczenie {number + 1} - {meaningWithSigns.context}
          </div>
          <div className="additionalInfoText"> {years} </div>
          <div> {meaningWithSigns.notes} </div>
        </div>
        <ActionButton text="edytuj" setIsFormOpen={setIsFormOpen} />
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
