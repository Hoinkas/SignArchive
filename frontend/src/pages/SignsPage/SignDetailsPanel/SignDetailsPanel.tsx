import Loader from '@src/components/Loader/Loader'
import SignInfo from '../SignInfo/SignInfo'
import './SignDetailsPanel.css'
import { useSign } from '@src/hooks/SignContext/useSign'
import type { IMeaningDetails } from '@src/models/meaning.model'
import MeaningItem from './MeaningItem/MeaningItem'
import { createPortal } from 'react-dom'
import MediaPlayer from '../SingList/SignItem/MediaPlayer/MediaPlayer'

const meanings: IMeaningDetails[] = [
  {
    id: '', createdAt: 0,
    explanation: 'Niewiem',
    sources: [
      {
        id: '',
        createdAt: 0,
        context: 'No oznacza kraj',
        yearStart: 1985,
        yearEnd: 2026,
        reference: {
          id: '',
          createdAt: 0,
          name: 'Świat Głuchych',
          fullName: 'Magazyn Świat Głuchych wydawany przez PZG',
          type: 'book',
          url: '',
          notes: 'To magazyn słyszaków. Nie wiadomo czy g/Głusi używali tych znaków'
        },
        regions: [{id: '', createdAt: 0, name: 'Kraków'}, {id: '', createdAt: 0, name: 'Warszawa'}]
        }
    ],
    words: [{id: '', createdAt: 0, name: 'Kraków'}, {id: '', createdAt: 0, name: 'Katedra'}]
  }
]

function SignDetailsPanel(): React.JSX.Element {
  const { sign, simpleSign, signLoading, openCloseSidePanel } = useSign()

  if (!sign) return <></>
  if (signLoading) return <Loader/>

  return createPortal(
    <div className="signDetails">
      <div className='stickyBar'>
        <p className='signTitle'>Znak #001</p>
         <div className="clickableSymbolCircle" onClick={() => openCloseSidePanel(sign.id)}>×</div>
      </div>
      <div className='generalAndMedia'>
        <MediaPlayer media={sign.media}/>
        <SignInfo signSimple={simpleSign}/>
      </div>
      <>
        {meanings.map((meaning, key) =>
          <MeaningItem key={key} meaningDetails={meaning}/>
        )}
      </>
    </div>,
    document.body
  )
}

export default SignDetailsPanel
