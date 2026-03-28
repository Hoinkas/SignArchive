import './SignList.css'
import { SignWithSourcesDetails } from '@shared/types'
import SignBox from './SignBox/SignBox'

interface SignListProps {
  signs: SignWithSourcesDetails[]
}

function SignList(props: SignListProps): React.JSX.Element {
  const { signs } = props

  return (
    <div className="signList">
      {signs.map((sign, key) => (
        <SignBox key={key} sign={sign} />
      ))}
    </div>
  )
}

export default SignList
