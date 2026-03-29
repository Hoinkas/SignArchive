import { useState } from 'react'
import SignBox from './SignBox/SignBox'
import './SignList.css'
import AddSign from './AddSign/AddSign'
import AddSignForm from '@renderer/components/Form/Forms/AddSignForm'
import { SignWithSourceDetails } from '@shared/types'

interface SignListProps {
  meaningId: string
  signs: SignWithSourceDetails[]
  setSignValues: (sign: SignWithSourceDetails) => void
}

function SignList({ meaningId, signs, setSignValues }: SignListProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <div className="signList">
      {signs.map((sign, key) => (
        <SignBox key={key} sign={sign} setSignValues={setSignValues} />
      ))}
      {isFormOpen ? (
        <AddSignForm
          meaningId={meaningId}
          formType="add"
          setSignValues={setSignValues}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <AddSign setIsFormOpen={setIsFormOpen} />
      )}
    </div>
  )
}

export default SignList
