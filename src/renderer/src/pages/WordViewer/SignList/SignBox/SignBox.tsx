import './SignBox.css'
import { SignWithSourceDetails } from '@shared/types'
import TagList from '@renderer/components/TagList/TagList'
import MediaPlayer from '@renderer/components/MediaPlayer/MediaPlayer'

interface SignBoxProps {
  sign: SignWithSourceDetails
}

function SignBox(props: SignBoxProps): React.JSX.Element {
  const { sign } = props

  const pillText: string[] = []

  const source = sign.source
  // const signer = source.signer
  const mediaFile = source.mediaFile
  const notes = source.notes ?? ''
  // const signerNameSurname = signer ? signer.name + ' ' + signer.surname : 'Migacz nieznany'

  // const years = useMemo(() => {
  //   const years = sign.sources.flatMap((s) => (s.yearStart != null ? [s.yearStart] : []))

  //   const yearStart = years.length > 0 ? Math.min(...years) : null
  //   const yearEnd = years.length > 0 ? Math.max(...years) : null

  //   if (yearStart && yearEnd) return yearStart + ' - ' + yearEnd
  //   return yearStart || yearEnd || 'brak roku'
  // }, [sign.sources])

  return (
    <div className="signBox">
      {mediaFile && <MediaPlayer mediaFile={mediaFile} />}
      <div className="variantDetails">
        <div className="additionalInfoText">
          {source.author?.name} · {source.yearStart}
        </div>
        {/* <div>{signerNameSurname}</div> */}
        <h4>{notes}</h4>
        <div className="bottomBox">
          <TagList textArray={pillText} />
        </div>
      </div>
    </div>
  )
}

export default SignBox
