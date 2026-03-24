import './MeaningBox.css'
import { MeaningWithSigns } from '@shared/types'
import MediaBox from './MediaPlayer/MediaPlayer'
import PillBoxList from '../PillBoxList/PillBoxList'

interface MeaningBoxProps {
  meaning: MeaningWithSigns
}

function MeaningBox({ meaning }: MeaningBoxProps): React.JSX.Element {
  const sign = meaning.signs[0]
  const pillText: string[] = []

  const context = meaning.meaning.context
  if (context) { pillText.push(context) }

  const region = meaning.meaning.region
  if (region) { pillText.push(region) }

  const source = sign.source?.name
  if (source) {pillText.push(source)}

  const yearStart = meaning.meaning.yearStart
  const yearEnd = meaning.meaning.yearEnd
  let years = (yearStart || yearEnd || 'Brak roku').toString()
  if (yearStart && yearEnd) years = yearStart + ' - ' + yearEnd
  pillText.push(years)

  const notes = sign.sign.notes ? 'Notatki: ' + sign.sign.notes : ''

  return (
    <div className="meaningBox">
      {sign.mediaFile && <MediaBox mediaFile={sign.mediaFile} />}
      <div className="contentBox">
        <h4>{notes}</h4>
        <PillBoxList textArray={pillText} />
      </div>
    </div>
  )
}

export default MeaningBox
