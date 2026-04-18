import './SignsPage.css'
import Loader from '@src/components/Loader/Loader'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignListTitle from './SignListTitle/SignListTitle'
import SignProvider from '@src/hooks/SignContext/SignProvider'
import SignList from './SingList/SignList'
import SignDetailsPanel from './SignDetailsPanel/SignDetailsPanel'

function SignsPage(): React.JSX.Element {
  const { signListLoading } = useSignList()

  if (signListLoading) return <Loader/>

  return (
    <div className="signPage page">
      <SignProvider>
        <SignListTitle/>
        <SignList/>
        <SignDetailsPanel/>
      </SignProvider>
    </div>
  )
}

export default SignsPage
