
import Loader from '@src/components/Loader/Loader'
import MediaPlayer from '@src/components/MediaPlayer/MediaPlayer'
import { useSign } from '@src/hooks/SignContext/useSign'
import { mergeYearText } from '@src/utils/namesHelpers'
import './SignsDetailsInfo.css'
import PolandMap from '@src/components/PolandMap/PolandMap'

function SignDetailsInfo(): React.JSX.Element {
  const { simpleSign } = useSign()

  if (!simpleSign) return <Loader/>
  const {words, notes, regions, years, media, uniqueNumber} = simpleSign

  return (
    <div style={{display: 'flex'}}>
      <div> 
        <div style={{borderBottom: 'var(--line-border)'}}>
          <MediaPlayer media={media} isDetails/>
        </div>
        <div className="details additionalInfo">
          <div>OSOBA MIGAJĄCA:</div>
          <div>ŹRÓDŁO FILMU: </div>
        </div>
      </div>
      <div className='rightSide'>
        <div style={{display: 'flex', justifyContent: "center", borderBottom: 'var(--line-border)'}}>
          <PolandMap signs={[simpleSign]} small/>
        </div>
        <div className="details additionalInfo">
          <div>SŁOWA: {words.length > 0 ? words.join(', ') :'-'}</div>
          <div>REGIONY: {regions.length > 0 ? regions.flatMap((r) => r.name).join(', ') : '-'}</div>
          <div>LATA: {mergeYearText(years)}</div>
        </div>
      </div>      
    </div>
  )
}

export default SignDetailsInfo
