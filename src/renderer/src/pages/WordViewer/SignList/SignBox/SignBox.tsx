import './SignBox.css'
import { SignWithSourceDetails } from '@shared/types'
import TagList from '@renderer/components/TagList/TagList'
import MediaPlayer from '@renderer/components/MediaPlayer/MediaPlayer'
import { useMemo } from 'react'

interface SignBoxProps {
  sign: SignWithSourceDetails
}

function SignBox(props: SignBoxProps): React.JSX.Element {
  const { sign } = props

  const pillText: string[] = []

  const source = sign.source
  const mediaFile = source.mediaFile
  const notes = sign.notes ?? ''

  // const signerNameSurname = signer ? signer.name + ' ' + signer.surname : 'Migacz nieznany'

  const years = useMemo(() => {
    // const years = sign.sources.flatMap((s) => (s.yearStart != null ? [s.yearStart] : []))

    // const yearStart = years.length > 0 ? Math.min(...years) : null
    // const yearEnd = years.length > 0 ? Math.max(...years) : null
    const yearStart = sign.yearStart
    const yearEnd = sign.yearEnd

    if (yearStart && yearEnd) return yearStart + ' - ' + yearEnd
    return yearStart || yearEnd || 'brak roku'
  }, [sign.yearEnd, sign.yearStart])

  return (
    <div className="signBox">
      {mediaFile && <MediaPlayer mediaFile={mediaFile} />}
      <div className="variantDetails">
        <div className="additionalInfoText">
          {source.author?.name} · {years}
        </div>
        <h4>{notes}</h4>
        <div className="bottomBox">
          <TagList textArray={pillText} />
        </div>
      </div>
    </div>
  )
}

export default SignBox
