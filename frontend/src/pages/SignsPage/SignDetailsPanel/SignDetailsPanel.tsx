import Loader from '@src/components/Loader/Loader'
import './SignDetailsPanel.css'
import SignDetailsInfo from './SignsDetailsInfo/SignsDetailsInfo'
import { useSign } from '@src/hooks/SignContext/useSign'
import { memo } from 'react'
import YearsDiagram from './YearsDiagram/YearsDiagram'
import MeaningsContainer from './MeaningsContainer/MeaningsContainer'

function SignDetailsPanel(): React.JSX.Element {
  const { sign, signLoading, openCloseSidePanel } = useSign()

  if (!sign) return <></>
  if (signLoading) return <Loader/>

  const paddedNumber = (sign.uniqueNumber + "").padStart(4, "0");

  return (
    <div className="signDetailsContainer">
      <div className='stickyBar'>
        <div className="clickable" onClick={() => openCloseSidePanel(sign.uniqueNumber)}> &lt; ZAMKNIJ</div>
        <div>NUMER: #{paddedNumber}</div>
      </div>
      <div className="signDetails">
        <SignDetailsInfo/>
        <YearsDiagram/>
        <MeaningsContainer/>
      </div>
    </div>
  )
}

export default memo(SignDetailsPanel)
