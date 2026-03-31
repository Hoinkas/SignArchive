import ActionButton from '@renderer/components/ActionButton/ActionButton'
import './SignTitle.css'
import { SignWithDetails } from '@shared/types'
import EditSignForm from '@renderer/components/Form/Forms/EditSignForm'
import { useState } from 'react'
import TagList from '@renderer/components/TagList/TagList'
import { mergeYearText } from '@renderer/functions/namesVersionsHelpers'

interface SignTitleProps {
  sign: SignWithDetails
  setSignValues: (sign: SignWithDetails) => void
}

function SignTitle(props: SignTitleProps): React.JSX.Element {
  const { sign, setSignValues } = props
  const [isFormOpen, setIsFormOpen] = useState(false)

  const years = mergeYearText(sign.yearStart, sign.yearEnd)
  const pillText: string[] = [years]

  return (
    <div className="signTitle">
      <div className="tagBox">
        <TagList textArray={pillText} />
      </div>
      {isFormOpen ? (
        <EditSignForm
          sign={sign}
          setSignValues={setSignValues}
          formType="edit"
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <ActionButton text="Edytuj" setIsFormOpen={setIsFormOpen} />
      )}
    </div>
  )
}

export default SignTitle
