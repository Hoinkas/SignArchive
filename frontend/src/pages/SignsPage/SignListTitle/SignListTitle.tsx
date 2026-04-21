import { signCountText } from '@src/utils/namesHelpers'
import ActionButton from '@src/components/ActionButton/ActionButton'
import { useState } from 'react'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignForm from '../Forms/SignForm'

function SignListTitle(): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const { filteredSigns } = useSignList()

  return (
    <div className='defaultInline'>
      <>{signCountText(filteredSigns.length)} znaleziono</>
      {isFormOpen ?
        <SignForm formType='add' closeAction={() => setIsFormOpen(false)}/>
        : <ActionButton text='Dodaj znak' buttonAction={() => setIsFormOpen(true)}/>
      }
    </div>
  )
}

export default SignListTitle
