import { signCountText } from '@src/utils/namesHelpers'
import ActionButton from '@src/components/ActionButton/ActionButton'
import { useState } from 'react'
import SignForm from '@src/components/Form/Forms/SignForm'

interface SignListTitleProps {
  signsCount: number
}

function SignListTitle({signsCount}: SignListTitleProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <div className='defaultInline'>
      <>{signCountText(signsCount)} znaleziono</>
      {isFormOpen ?
        <SignForm formType='add' closeForm={() => setIsFormOpen(false)}/>
        : <ActionButton text='Dodaj znak' buttonAction={() => setIsFormOpen(true)}/>
      }
    </div>
  )
}

export default SignListTitle
