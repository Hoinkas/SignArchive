import './SignList.css'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignItem from './SignItem/SignItem'

function SignList(): React.JSX.Element {
  const { filteredSigns } = useSignList()

  return (
    <div className="signList">
      {filteredSigns.map((sign, key) => (
        <SignItem key={key} signSimple={sign}/>
      ))}
    </div>
  )
}

export default SignList
