import { useSignList } from '@src/hooks/SignListContext/useSignList'
import { signCountText } from '@src/utils/namesHelpers'

function SignListTitle(): React.JSX.Element {
  const { signList } = useSignList()

  return (
    <div className='defaultInline'>
      <>{signCountText(signList.length)} znaleziono</>
    </div>
  )
}

export default SignListTitle
