
import Loader from '@src/components/Loader/Loader'
import MediaPlayer from '@src/components/MediaPlayer/MediaPlayer'
import { useSign } from '@src/hooks/SignContext/useSign'
import { mergeYearToText } from '@src/utils/namesHelpers'
import './SignsDetailsInfo.css'
import PolandMap from '@src/components/PolandMap/PolandMap'
import type { IRegionToFE, IRegionWords } from '@src/models/region.model'
import type { IYearStartEnd } from '@src/models/yearStartEnd.model'
import { removeRegionDuplicates, removeYearsDuplicates, renameWordsDuplicates } from '@src/utils/removeDuplicates'

function SignDetailsInfo(): React.JSX.Element {
  const { sign, signLoading } = useSign()
  if (signLoading) return <Loader/>
  if (!sign) return <></>

  const {media, meanings} = sign
  const words: string[] = renameWordsDuplicates(meanings.flatMap(m => m.words)).map(w => w.name)
  const regions: IRegionToFE[] = removeRegionDuplicates(meanings.flatMap(m => m.sources.flatMap(s => s.regions)))
  const years: IYearStartEnd[] = removeYearsDuplicates(meanings.flatMap(m => m.sources.flatMap(s => {return {yearStart: s.yearStart, yearEnd: s.yearEnd}})))

  return (
    <div className='signsDetailsContainer'>
      <div>
        <div className='mediaContainer'>
          <MediaPlayer media={media} isDetails/>
        </div>
        <div className="details additionalInfo">
          <div>OSOBA MIGAJĄCA:</div>
          <div>ŹRÓDŁO FILMU: </div>
        </div>
      </div>
      <div className='rightSide'>
        <div className='mapContainer'>
          {/* <PolandMap regions={} small/> */}
        </div>
        <div className="details additionalInfo">
          <div>SŁOWA: {words.length > 0 ? words.join(', ') :'-'}</div>
          <div>REGIONY: {regions.length > 0 ? regions.flatMap((r) => r.name).join(', ') : '-'}</div>
          <div>LATA: {years.map((y) => mergeYearToText(y)).join(', ')}</div>
        </div>
      </div>
    </div>
  )
}

export default SignDetailsInfo
