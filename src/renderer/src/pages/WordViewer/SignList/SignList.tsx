import { useState } from 'react'
import SignBox from './SignBox/SignBox'
import './SignList.css'
import { SignWithDetails } from '@shared/types'
import SourceList from '../SourceList/SourceList'

interface SignListProps {
  wordId: string
  signs: SignWithDetails[]
  setSignValues: (sign: SignWithDetails) => void
  handleSignDelete: (deleteId: string) => void
}

function SignList(props: SignListProps): React.JSX.Element {
  const { wordId, signs, setSignValues, handleSignDelete } = props

  const [sourcesPanelSign, setSourcesPanelSign] = useState<SignWithDetails | null>(null)

  return (
    <div className="signList">
      {signs.map((sign, key) => (
        <SignBox
          key={key}
          sign={sign}
          setSignValues={setSignValues}
          setSourcesPanelSign={setSourcesPanelSign}
          handleSignDelete={() => handleSignDelete(sign.id)}
        />
      ))}
      {sourcesPanelSign && (
        <SourceList
          wordId={wordId}
          sign={sourcesPanelSign}
          closeForm={() => setSourcesPanelSign(null)}
        />
      )}
    </div>
  )
}

export default SignList
