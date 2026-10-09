import './SignsPage.css'
import Loader from '@src/components/Loader/Loader'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignList from './SingList/SignList'
import PolandMap from '@src/components/PolandMap/PolandMap'
import Statistics from './Statistics/Statistics'
import SearchBar from './SearchBar/SearchBar'

function SignsPage(): React.JSX.Element {
  const { signListLoading } = useSignList()

  if (signListLoading) return <Loader/>
  return (
    <div className="signPage page">
      <div className='mapSearchContener'>
        <div className='mapContener'><PolandMap/></div>
        <div style={{width: '80%', height: '100%', margin: 'auto 0'}}>
          <SearchBar/>
          <Statistics/>
        </div>
      </div>
      <SignList/>
    </div>
  )
}

export default SignsPage
