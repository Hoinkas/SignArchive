import { signCountText } from '@src/utils/namesHelpers'
import ActionButton from '@src/components/ActionButton/ActionButton'
import { useState } from 'react'
import SignForm from '@src/components/Form/Forms/SignForm'
import { useSignList } from '@src/hooks/SignListContext/useSignList'

function SignListTitle(): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const { signList } = useSignList()

  return (
    <div className='defaultInline'>
      <>{signCountText(signList.length)} znaleziono</>
      {isFormOpen ?
        <SignForm formType='add' closeForm={() => setIsFormOpen(false)}/>
        : <ActionButton text='Dodaj znak' buttonAction={() => setIsFormOpen(true)}/>
      }
    </div>
  )
}

export default SignListTitle
