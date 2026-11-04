import './SignsPage.css'
import Loader from '@src/components/Loader/Loader'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignList from './SingList/SignList'
import PolandMap from '@src/components/PolandMap/PolandMap'
import Statistics from './Statistics/Statistics'
import SearchBar from './SearchBar/SearchBar'
import SignDetailsPanel from './SignDetailsPanel/SignDetailsPanel'

function SignsPage(): React.JSX.Element {
  const { signListLoading, filteredSigns } = useSignList()

  if (signListLoading) return <Loader/>
  const regions = filteredSigns.flatMap((s) => s.regions)

  return (
    <div className="signPage page">
      <div className='signsList'>
        <div className='mapSearchContener'>
          <div className='mapContener'><PolandMap regions={regions} interactive/></div>
          <div style={{width: '80%', height: '100%', margin: 'auto 0'}}>
            <SearchBar/>
            <Statistics/>
          </div>
        </div>
        <SignList/>
      </div>
      <SignDetailsPanel/>
    </div>
  )
}

export default SignsPage
