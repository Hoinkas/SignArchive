import MediaPlayer from './MediaPlayer/MediaPlayer'
import './VariantBox.css'
import { SignWithSourcesDetails } from '@shared/types'
import { useMemo } from 'react'
import PillBoxList from '@renderer/components/WordViewer/PillBoxList/PillBoxList'

interface VariantBoxProps {
  sign: SignWithSourcesDetails
}

function VariantBox(props: VariantBoxProps): React.JSX.Element {
  const { sign } = props

  const pillText: string[] = []

  const source = sign.sources[0]
  const signer = source.signer
  const mediaFile = source.mediaFile
  const notes = source.notes ?? ''
  const signerNameSurname = signer ? signer.name + ' ' + signer.surname : 'Migacz nieznany'

  const years = useMemo(() => {
    const years = sign.sources.flatMap((s) => (s.yearStart != null ? [s.yearStart] : []))

    const yearStart = years.length > 0 ? Math.min(...years) : null
    const yearEnd = years.length > 0 ? Math.max(...years) : null

    if (yearStart && yearEnd) return yearStart + ' - ' + yearEnd
    return yearStart || yearEnd || 'brak roku'
  }, [sign.sources])

  return (
    <div className={'variantBox'}>
      {mediaFile && <MediaPlayer mediaFile={mediaFile} />}
      <div className="variantDetails">
        <div>
          {source.author?.name} · {years}
        </div>
        <div>{signerNameSurname}</div>
        <h4>{notes}</h4>
        <div className="bottomBox">
          <PillBoxList textArray={pillText} />
        </div>
      </div>
    </div>
  )
}

export default VariantBox
