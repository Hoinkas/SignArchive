import Loader from '@src/components/Loader/Loader'
import './SignDetailsPanel.css'
import SignDetailsInfo from './SignsDetailsInfo/SignsDetailsInfo'
import { useSign } from '@src/hooks/SignContext/useSign'

function SignDetailsPanel(): React.JSX.Element {
  const { simpleSign, signLoading, openCloseSidePanel } = useSign()

  if (!simpleSign) return <></>
  if (signLoading) return <Loader/>

  const paddedNumber = (simpleSign.uniqueNumber + "").padStart(4, "0");

  return (
    <div className="signDetailsContainer additionalInfo">
      <div className='stickyBar'>
        <div className="clickable" onClick={() => openCloseSidePanel(simpleSign)}> &lt; ZAMKNIJ</div>
        <div>NUMER: #{paddedNumber}</div>
      </div>
      <div className="signDetails">
        <SignDetailsInfo/>
        {/* <>
          {sign.meanings.map((meaning, key) =>
            <MeaningItem key={key} meaning={meaning}/>
          )}
        </> */}
      </div>
    </div>
  )
}

export default SignDetailsPanel
