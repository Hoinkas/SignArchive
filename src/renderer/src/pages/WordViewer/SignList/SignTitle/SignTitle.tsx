import './SignTitle.css'
import { SignDetails } from '@shared/types'
import EditSignForm from '@renderer/components/Form/Forms/EditSignForm'
import { useState } from 'react'
import { mergeYearText } from '@renderer/functions/namesHelpers'
import KebabMenu from '@renderer/components/KebabMenu/KebabMenu'
import { useSigns } from '@contexts/SignsContext/useSigns'
import PillList from '@renderer/components/PillList/PillList'

interface SignTitleProps {
  sign: SignDetails
}

function SignTitle({ sign }: SignTitleProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { deleteSign } = useSigns()

  const years = mergeYearText(sign.yearStart, sign.yearEnd)
  const pillText: string[] = [years, ...sign.regions]

  return (
    <div className="signTitle">
      <div className="tagBox">
        <PillList textArray={pillText} />
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
