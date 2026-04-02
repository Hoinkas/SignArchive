import { useState } from 'react'
import SignBox from './SignBox/SignBox'
import './SignList.css'
import { SignWithDetails } from '@shared/types'
import SourceList from '../SourceList/SourceList'
import { useSign } from '@contexts/SignContext/useSign'

function SignList(): React.JSX.Element {
  const [sourcesPanelSign, setSourcesPanelSign] = useState<SignWithDetails | null>(null)
  const { signs } = useSign()

  return (
    <div className="signList">
      {signs.map((sign, key) => (
        <SignBox key={key} sign={sign} setSourcesPanelSign={setSourcesPanelSign} />
      ))}
      {sourcesPanelSign && (
        <SourceList sign={sourcesPanelSign} closeForm={() => setSourcesPanelSign(null)} />
      )}
    </div>
  )
}

export default SignList
