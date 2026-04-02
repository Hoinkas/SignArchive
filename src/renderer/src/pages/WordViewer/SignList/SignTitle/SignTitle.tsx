import './SignTitle.css'
import { SignWithDetails } from '@shared/types'
import EditSignForm from '@renderer/components/Form/Forms/EditSignForm'
import { useState } from 'react'
import TagList from '@renderer/components/TagList/TagList'
import { mergeYearText } from '@renderer/functions/namesVersionsHelpers'
import KebabMenu from '@renderer/components/KebabMenu/KebabMenu'
import { useSign } from '@contexts/SignContext/useSign'

interface SignTitleProps {
  sign: SignWithDetails
}

function SignTitle({ sign }: SignTitleProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { deleteSign } = useSign()

  const years = mergeYearText(sign.yearStart, sign.yearEnd)
  const pillText: string[] = [years]

  return (
    <div className="signTitle">
      <div className="tagBox">
        <TagList textArray={pillText} />
      </div>
      {isFormOpen ? (
        <EditSignForm sign={sign} formType="edit" setIsFormOpen={setIsFormOpen} />
      ) : (
        <KebabMenu setIsFormOpen={setIsFormOpen} handleDelete={() => deleteSign(sign.id)} />
      )}
    </div>
  )
}

export default SignTitle
