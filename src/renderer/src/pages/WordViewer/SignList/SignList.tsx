import SignBox from './SignBox/SignBox'
import './SignList.css'
import SourceList from '../SourceList/SourceList'
import { useSigns } from '@contexts/SignsContext/useSigns'
import { useSources } from '@contexts/SourcesContext/useSources'

function SignList(): React.JSX.Element {
  const { signs } = useSigns()
  const { sourcesPanelSign } = useSources()

  return (
    <div className="signList">
      {signs.map((sign, key) => (
        <SignBox key={key} sign={sign} />
      ))}
      {sourcesPanelSign && <SourceList sign={sourcesPanelSign} />}
    </div>
  )
}

export default SignList
