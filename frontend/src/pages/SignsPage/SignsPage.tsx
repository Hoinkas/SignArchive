import './SignsPage.css'
import Loader from '@src/components/Loader/Loader'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignListTitle from './SignListTitle/SignListTitle'
import SignList from './SingList/SignList'

function SignsPage(): React.JSX.Element {
  const { signListLoading } = useSignList()

  if (signListLoading) return <Loader/>

  return (
    <div className="signPage page">
        <SignListTitle/>
        <SignList/>
    </div>
  )
}

export default SignsPage
