import './SignList.css'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignItem from './SignItem/SignItem'
import { useCallback, useMemo, useState } from 'react';

function SignList(): React.JSX.Element {
  const { filteredSigns } = useSignList()

  const [loadIteration, setLoadIteration] = useState<number>(1);

  const signToDisplayPerLoad = useCallback(() =>  {
    if (window.matchMedia('(max-width: 768px)').matches) return 4;
    if (window.matchMedia('(max-width: 1279px)').matches) return 6;
    return 9;
  }, [])

  const signsToDisplay = useMemo(() => {
    return filteredSigns.slice(0, signToDisplayPerLoad() * loadIteration);
  }, [filteredSigns, loadIteration, signToDisplayPerLoad]);


  return (
    <div>
      <div className="signList">
        {signsToDisplay.map((sign, key) => (
          <SignItem key={key} signSimple={sign} />
        ))}
      </div>
      <div style={{margin: '16px', width: '100%', display: 'flex', justifyContent: 'center'}}>
        <button onClick={() => setLoadIteration(loadIteration + 1)}>Załaduj więcej</button>
      </div>
    </div>
  )
}

export default SignList
