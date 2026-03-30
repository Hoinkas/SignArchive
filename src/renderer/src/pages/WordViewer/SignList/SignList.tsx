import { useState } from 'react'
import SignBox from './SignBox/SignBox'
import './SignList.css'
import AddSign from './AddSign/AddSign'
import AddSignForm from '@renderer/components/Form/Forms/AddSignForm'
import { SignWithSourceDetails } from '@shared/types'
import SourceList from '../SourceList/SourceList'

interface SignListProps {
  meaningId: string
  signs: SignWithSourceDetails[]
  setSignValues: (sign: SignWithSourceDetails) => void
}

function SignList({ meaningId, signs, setSignValues }: SignListProps): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [sourcesPanelSign, setSourcesPanelSign] = useState<SignWithSourceDetails | null>(null)

  return (
    <div className="signList">
      {signs.map((sign, key) => (
        <SignBox
          key={key}
          sign={sign}
          setSignValues={setSignValues}
          setSourcesPanelSign={setSourcesPanelSign}
        />
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
      {sourcesPanelSign && (
        <SourceList sign={sourcesPanelSign} closeForm={() => setSourcesPanelSign(null)} />
      )}
    </div>
  )
}

export default SignList
