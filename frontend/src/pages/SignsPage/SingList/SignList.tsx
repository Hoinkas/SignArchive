import './SignList.css'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignItem from './SignItem/SignItem'

function SignList(): React.JSX.Element {
  const { signList } = useSignList()

  return (
    <div className="signList">
      {signList.map((sign, key) => (
        <SignItem key={key} signSimple={sign}/>
      ))}
    </div>
  )
}

export default SignList
