import SignBox from './SignBox/SignBox'
import './SignList.css'
import SourceList from '../SourceList/SourceList'
import { useSigns } from '@src/hooks/SignsContext/useSigns'
import { useSources } from '@src/hooks/SourcesContext/useSources'
import Loader from '@src/components/Loader/Loader'

function SignList(): React.JSX.Element {
  const { signs, loadSigns } = useSigns()
  const { sourcesPanelSign } = useSources()

  if (loadSigns) return <Loader/>

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
