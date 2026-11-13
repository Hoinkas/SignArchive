import './SignsPage.css'
import Loader from '@src/components/Loader/Loader'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignList from './SingList/SignList'
import PolandMap from '@src/components/PolandMap/PolandMap'
import Statistics from './Statistics/Statistics'
import SearchBar from './SearchBar/SearchBar'
import SignDetailsPanel from './SignDetailsPanel/SignDetailsPanel'
import { useSearchParams } from 'react-router'
import { calculateSignsMapStatistics } from '@src/utils/calculateMapStatistics'

function SignsPage(): React.JSX.Element {
  const { signListLoading, filteredSigns } = useSignList()
  const [searchParams] = useSearchParams()

  if (signListLoading) return <Loader/>
  const mapStats = calculateSignsMapStatistics(filteredSigns)

  return (
    <div className="signPage page">
      <div className='signsList'>
        <div className='mapSearchContainer'>
          <div className='bigMapContainer'>
            <PolandMap mapStats={mapStats} interactive/>
          </div>
          <div className='searchStatisticsContainer'>
            <SearchBar/>
            <Statistics/>
          </div>
        </div>
        <SignList/>
      </div>
      {searchParams.has('signNumber') && <SignDetailsPanel/>}
    </div>
  )
}

export default SignsPage
