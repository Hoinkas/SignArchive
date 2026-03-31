import { useState } from 'react'
import SignBox from './SignBox/SignBox'
import './SignList.css'
import { SignWithDetails } from '@shared/types'
import SourceList from '../SourceList/SourceList'

interface SignListProps {
  wordId: string
  signs: SignWithDetails[]
  setSignValues: (sign: SignWithDetails) => void
}

function SignList({ wordId, signs, setSignValues }: SignListProps): React.JSX.Element {
  const [sourcesPanelSign, setSourcesPanelSign] = useState<SignWithDetails | null>(null)

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
