import './SignTitle.css'
import { SignWithDetails } from '@shared/types'
import EditSignForm from '@renderer/components/Form/Forms/EditSignForm'
import { useState } from 'react'
import TagList from '@renderer/components/TagList/TagList'
import { mergeYearText } from '@renderer/functions/namesVersionsHelpers'
import KebabMenu from '@renderer/components/KebabMenu/KebabMenu'

interface SignTitleProps {
  sign: SignWithDetails
  setSignValues: (sign: SignWithDetails) => void
  handleSignDelete: () => void
}

function SignTitle(props: SignTitleProps): React.JSX.Element {
  const { sign, setSignValues, handleSignDelete } = props
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
        <KebabMenu setIsFormOpen={setIsFormOpen} handleDelete={handleSignDelete} />
      )}
    </div>
  )
}

export default SignTitle
