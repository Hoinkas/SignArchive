import { useState } from 'react'
import SignBox from './SignBox/SignBox'
import './SignList.css'
import AddSign from './AddSign/AddSign'
import SignForm from '@renderer/components/Form/Forms/SignForm'
import { SignWithSourceDetails } from '@shared/types'

interface SignListProps {
  signs: SignWithSourceDetails[]
  setSignValues: (sign: SignWithSourceDetails) => void
}

function SignList({ signs, setSignValues }: SignListProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <div className="signList">
      {signs.map((sign, key) => (
        <SignBox key={key} sign={sign} />
      ))}
      {isFormOpen ? (
        <SignForm formType="add" setSignValues={setSignValues} setIsFormOpen={setIsFormOpen} />
      ) : (
        <AddSign setIsFormOpen={setIsFormOpen} />
      )}
    </div>
  )
}

export default SignList
