import './SignsPage.css'
import Loader from '@src/components/Loader/Loader'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignListTitle from './SingList/SignListTitle/SignListTitle'
import SignList from './SingList/SignList'
import PolandMap from '@src/components/PolandMap/PolandMap'

function SignsPage(): React.JSX.Element {
  const { signListLoading } = useSignList()

  if (signListLoading) return <Loader/>

  return (
    <div className="signPage page">
        <PolandMap/>
        <SignListTitle/>
        <SignList/>
    </div>
  )
}

export default SignsPage
