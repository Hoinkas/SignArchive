import './SignsPage.css'
import Loader from '@src/components/Loader/Loader'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignItem from './SignItem/SignItem'
import SignListTitle from './SignListTitle/SignListTitle'
import SignProvider from '@src/hooks/SignContext/SignProvider'

function SignsPage(): React.JSX.Element {
  const { signList, signListLoading } = useSignList()

  if (signListLoading) return <Loader/>

  return (
      <div className="signPage">
        <SignProvider><SignListTitle signsCount={signList.length}/></SignProvider>
        <div className="signListContainer">
          {signList.map((sign, key) => (
            <SignItem key={key} signSimple={sign}/>
          ))}
        </div>
      </div>
  )
}

export default SignsPage
