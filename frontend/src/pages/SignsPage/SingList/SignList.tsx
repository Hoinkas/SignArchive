import './SignList.css'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignItem from './SignItem/SignItem'
import { useRef } from 'react';

function SignList(): React.JSX.Element {
  const { filteredSigns } = useSignList()
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="signList" ref={containerRef}>
      {filteredSigns.map((sign, key) => (
        <SignItem key={key} signSimple={sign} />
      ))}
    </div>
  )
}

export default SignList
