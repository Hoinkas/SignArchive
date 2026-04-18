import Loader from '@src/components/Loader/Loader'
import SignInfo from '../SignInfo/SignInfo'
import './SignDetailsPanel.css'
import { useSign } from '@src/hooks/SignContext/useSign'

function SignDetailsPanel(): React.JSX.Element {
  const { sign, simpleSign, signLoading } = useSign()

  if (!sign) return <></>
  if (signLoading) return <Loader/>

  return (
    <div className="signDetails">
      <>Podsumowanie</>
      <SignInfo signSimple={simpleSign}/>
    </div>
  )
}

export default SignDetailsPanel
