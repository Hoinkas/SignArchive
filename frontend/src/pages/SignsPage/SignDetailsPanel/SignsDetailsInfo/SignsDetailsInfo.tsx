
import Loader from '@src/components/Loader/Loader'
import MediaPlayer from '@src/components/MediaPlayer/MediaPlayer'
import { useSign } from '@src/hooks/SignContext/useSign'
import { mergeYearText } from '@src/utils/namesHelpers'
import './SignsDetailsInfo.css'
import PolandMap from '@src/components/PolandMap/PolandMap'
import type { IRegionToFE } from '@src/models/region.model'
import type { IYearStartEnd } from '@src/models/yearStartEnd.model'

function SignDetailsInfo(): React.JSX.Element {
  const { sign, signLoading } = useSign()

  if (signLoading) return <Loader/>
  const {meanings, media} = sign

  const words: string[] = sign.meanings.flatMap((m) => m.words.flatMap((w) => w.name))
  const regions: IRegionToFE[] = sign.meanings.flatMap((m) => m.sources.flatMap((s) => s.regions))
  const years: IYearStartEnd[] = sign.meanings.flatMap((m) => m.sources.flatMap((s) => {return {yearStart: s.yearStart, yearEnd: s.yearEnd}}))

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
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
          <div style={{display: 'flex', justifyContent: "center", borderBottom: 'var(--line-border)', padding: 'var(--space-4)'}}>
            <PolandMap regions={regions} small/>
          </div>
          <div className="details additionalInfo">
            <div>SŁOWA: {words.length > 0 ? words.join(', ') :'-'}</div>
            <div>REGIONY: {regions.length > 0 ? regions.flatMap((r) => r.name).join(', ') : '-'}</div>
            <div>LATA: {years.map((y) => mergeYearText(y))}</div>
          </div>
        </div>
      </div>
      <div>
        {sign.meanings.flatMap((m) => m.id)}
      </div>
    </div>
  )
}

export default SignDetailsInfo
