import './MeaningBox.css'
import { Meaning, MeaningWithSignsDetails, SignWithSourceDetails } from '@shared/types'
import { useMemo, useState } from 'react'
import MeaningForm from '../../../../components/Form/Forms/MeaningForm'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import SignList from '../../SignList/SignList'
import { mergeYearText } from '@renderer/functions/namesVersionsHelpers'

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
    const years = meaningWithSigns.signs.flatMap((s) => ({
      yearStart: s.yearStart,
      yearEnd: s.yearEnd
    }))
    const yearsStart: number[] = []
    const yearsEnd: number[] = []

    years.forEach((y) => {
      if (y.yearStart) yearsStart.push(y.yearStart)
      if (y.yearEnd) yearsEnd.push(y.yearEnd)
    })

    const yearStart = yearsStart.length > 0 ? Math.min(...yearsStart) : null
    const yearEnd = yearsEnd.length > 0 ? Math.max(...yearsEnd) : null

    return mergeYearText(yearStart, yearEnd)
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
