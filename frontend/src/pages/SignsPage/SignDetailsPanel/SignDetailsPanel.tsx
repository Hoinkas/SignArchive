import Loader from '@src/components/Loader/Loader'
import './SignDetailsPanel.css'
import { useSign } from '@src/hooks/SignContext/useSign'
import MeaningItem from './MeaningItem/MeaningItem'
import { createPortal } from 'react-dom'
import SignDetailsInfo from './SignDetailsInfo/SignDetailsInfo'

function SignDetailsPanel(): React.JSX.Element {
  const { sign, signLoading, openCloseSidePanel } = useSign()

  if (!sign) return <></>
  if (signLoading) return <Loader/>

  return createPortal(
    <div className="signDetailsContainer">
      <div className='stickyBar'>
        <p className='signTitle'>Znak #001</p>
         <div className="clickableSymbolCircle" onClick={() => openCloseSidePanel(sign.id)}>×</div>
      </div>
      <div className="signDetails">
        <SignDetailsInfo/>
        <>
          {sign.meanings.map((meaning, key) =>
            <MeaningItem key={key} meaning={meaning}/>
          )}
        </>
      </div>
    </div>,
    document.body
  )
}

export default SignDetailsPanel
