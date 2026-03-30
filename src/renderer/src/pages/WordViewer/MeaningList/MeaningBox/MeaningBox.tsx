import './MeaningBox.css'
import { Meaning, MeaningWithSignsDetails, SignWithSourceDetails } from '@shared/types'
import { useMemo, useState } from 'react'
import MeaningForm from '../../../../components/Form/Forms/MeaningForm'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import SignList from '../../SignList/SignList'

interface MeaningBoxProps {
  meaningWithSigns: MeaningWithSignsDetails
  number: number
  setMeaningValues: (meaning: Meaning) => void
  setSignValues: (meaningId: string, sign: SignWithSourceDetails) => void
}

function MeaningBox(props: MeaningBoxProps): React.JSX.Element {
  const { meaningWithSigns, number, setMeaningValues, setSignValues } = props

  const [isFormOpen, setIsFormOpen] = useState(false)

  const years = useMemo(() => {
    const allSources = meaningWithSigns.signs.flatMap((sign) => sign.source)
    const years = allSources.flatMap((s) => (s.yearStart != null ? [s.yearStart] : []))

    if (years.length === 0) return 'brak roku'
    if (years.length === 1) return years[0]

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
          <div className="additionalInfo"> {years} </div>
          <div> {meaningWithSigns.notes} </div>
        </div>
        <ActionButton text="edytuj" setIsFormOpen={setIsFormOpen} />
      </div>
      <SignList
        meaningId={meaningWithSigns.id}
        signs={meaningWithSigns.signs}
        setSignValues={(sign) => setSignValues(meaningWithSigns.id, sign)}
      />
    </div>
  )
}

export default MeaningBox
