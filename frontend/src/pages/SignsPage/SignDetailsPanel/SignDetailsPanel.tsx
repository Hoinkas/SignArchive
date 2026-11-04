import Loader from '@src/components/Loader/Loader'
import './SignDetailsPanel.css'
import SignDetailsInfo from './SignsDetailsInfo/SignsDetailsInfo'
import { useSign } from '@src/hooks/SignContext/useSign'
import { memo } from 'react'

function SignDetailsPanel(): React.JSX.Element {
  const { sign, signLoading, openCloseSidePanel } = useSign()

  if (!sign) return <></>
  if (signLoading) return <Loader/>

  const paddedNumber = (sign.uniqueNumber + "").padStart(4, "0");

  return (
    <div className="signDetailsContainer additionalInfo">
      <div className='stickyBar'>
        <div className="clickable" onClick={() => openCloseSidePanel(sign.uniqueNumber)}> &lt; ZAMKNIJ</div>
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

export default memo(SignDetailsPanel)
