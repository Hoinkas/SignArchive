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
    <div className="signDetailsContainer">
      <div className='stickyBar'>
        <div>NUMER: #{paddedNumber}</div>
        <div className="clickableSymbolX clickableCircle" onClick={() => openCloseSidePanel(simpleSign)}>×</div>
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
