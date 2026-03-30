import './SignBox.css'
import { SignWithSourceDetails } from '@shared/types'
import TagList from '@renderer/components/TagList/TagList'
import MediaPlayer from '@renderer/components/MediaPlayer/MediaPlayer'
import { Dispatch, SetStateAction, useState } from 'react'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import EditSignForm from '@renderer/components/Form/Forms/EditSignForm'
import { mergeYearText, sourcesCountText } from '@renderer/functions/namesVersionsHelpers'

interface SignBoxProps {
  sign: SignWithSourceDetails
  setSignValues: (sign: SignWithSourceDetails) => void
  setSourcesPanelSign: Dispatch<SetStateAction<SignWithSourceDetails | null>>
}

function SignBox({ sign, setSignValues, setSourcesPanelSign }: SignBoxProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const source = sign.source

  const years = mergeYearText(sign.yearStart, sign.yearEnd)
  const pillText: string[] = [years]
  if (source.region) pillText.push(source.region)

  return (
    <div className="signBox">
      <MediaPlayer mediaFile={source.mediaFile} />
      <div className="variantDetails">
        <div className="tagBox">
          <TagList textArray={pillText} />
        </div>
        <a onClick={() => setSourcesPanelSign(sign)} className="additionalInfo">
          {sourcesCountText(sign.sourcesCount)}
        </a>
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
        <div style={{ margin: '0 auto' }}>
          {!isFormOpen && <ActionButton text={'Edytuj'} setIsFormOpen={setIsFormOpen} />}
        </div>
      </div>
    </div>
  )
}

export default SignBox
