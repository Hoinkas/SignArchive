import './SignsPage.css'
import { useSigns } from '@src/hooks/SignsContext/useSigns'
import Loader from '@src/components/Loader/Loader'
import { useEffect } from 'react'

function SignList(): React.JSX.Element {
  const { signList, signListLoading, initiateSigns } = useSigns()

  useEffect(() => {
    initiateSigns()
  },[initiateSigns])

  if (signListLoading) return <Loader/>

  return (
    <div className="signListContainer">
      {signList.map((sign, key) => (
        // <SignBox key={key} sign={sign} />
        <div key={key}>{sign.words}</div>
      ))}
    </div>
  )
}

export default SignList
