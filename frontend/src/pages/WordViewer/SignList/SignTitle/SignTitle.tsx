import './SignTitle.css'
import EditSignForm from '@src/components/Form/Forms/EditSignForm'
import { useState } from 'react'
import { mergeYearText } from '@src/utils/namesHelpers'
import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import { useSigns } from '@src/hooks/SignsContext/useSigns'
import PillList from '@src/components/PillList/PillList'
import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import type { ISignDetails } from '@src/models/sign.model'

interface SignTitleProps {
  sign: ISignDetails
}

function SignTitle({ sign }: SignTitleProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { deleteSign } = useSigns()
  const { isAdmin } = usePermissions()

  const years = mergeYearText(sign.yearStart, sign.yearEnd)
  const pillText: string[] = [years, ...sign.regions]

  return (
    <div className="signTitle">
      <div className="tagBox">
        <PillList textArray={pillText} />
      </div>
      {isAdmin ? (isFormOpen ? (
        <EditSignForm sign={sign} formType="edit" setIsFormOpen={setIsFormOpen} />
      ) : (
        <KebabMenu setIsFormOpen={setIsFormOpen} handleDelete={() => deleteSign(sign.id)} />
      )) : <div></div>}
    </div>
  )
}

export default SignTitle
