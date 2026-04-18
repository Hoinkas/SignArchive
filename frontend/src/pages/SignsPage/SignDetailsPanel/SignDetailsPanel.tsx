import SignInfo from '../SignInfo/SignInfo'
import './SignDetailsPanel.css'
import { useSign } from '@src/hooks/SignContext/useSign'

function SignDetails(): React.JSX.Element {
  const { sign, simpleSign } = useSign()

  return (
    <div className="signDetails">
      <>Podsumowanie</>
      <SignInfo signSimple={simpleSign}/>
    </div>
  )
}

function SignDetailsPanel(): React.JSX.Element {
  const { sign } = useSign()

  return sign ? <SignDetails/> : <></>
}

export default SignDetailsPanel
