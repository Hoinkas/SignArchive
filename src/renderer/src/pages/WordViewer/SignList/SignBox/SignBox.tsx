import './SignBox.css'
import { SignWithSourceDetails } from '@shared/types'
import TagList from '@renderer/components/TagList/TagList'
import MediaPlayer from '@renderer/components/MediaPlayer/MediaPlayer'
import { useMemo, useState } from 'react'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import EditSignForm from '@renderer/components/Form/Forms/EditSignForm'

interface SignBoxProps {
  sign: SignWithSourceDetails
  setSignValues: (sign: SignWithSourceDetails) => void
}

function SignBox({ sign, setSignValues }: SignBoxProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const source = sign.source

  const pillText: string[] = []
  if (source.region) pillText.push(source.region)

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
      <MediaPlayer mediaFile={source.mediaFile} />
      <div className="variantDetails">
        <div className="additionalInfoText">
          {source.author?.name} · {years}
        </div>
        {isFormOpen ? (
          <EditSignForm
            sign={sign}
            setSignValues={setSignValues}
            formType="edit"
            setIsFormOpen={setIsFormOpen}
          />
        ) : (
          <h4>{sign.notes}</h4>
        )}
        <div className="bottomBox">
          <TagList textArray={pillText} />
        </div>
        <div style={{ margin: '0 auto' }}>
          {!isFormOpen && <ActionButton text={'Edytuj'} setIsFormOpen={setIsFormOpen} />}
        </div>
      </div>
    </div>
  )
}

export default SignBox
