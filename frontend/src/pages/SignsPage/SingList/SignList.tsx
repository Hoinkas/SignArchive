import './SignList.css'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import SignItem from './SignItem/SignItem'
import { useEffect, useMemo, useRef, useState } from 'react';

function SignList(): React.JSX.Element {
  const { filteredSigns } = useSignList()

  function getSignsPerLoad(): number {
    if (window.matchMedia('(max-width: 768px)').matches) return 6;
    if (window.matchMedia('(max-width: 1279px)').matches) return 8;
    return 9;
  }

  const [loadIteration, setLoadIteration] = useState<number>(1);
  const [signToDisplayPerLoad, setSignToDisplayPerLoad] = useState<number>(getSignsPerLoad);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mqLarge = window.matchMedia('(max-width: 1279px)');
    const mqSmall = window.matchMedia('(max-width: 768px)');

    const handleChange = () => setSignToDisplayPerLoad(getSignsPerLoad());

    mqLarge.addEventListener('change', handleChange);
    mqSmall.addEventListener('change', handleChange);

    return () => {
      mqLarge.removeEventListener('change', handleChange);
      mqSmall.removeEventListener('change', handleChange);
    };
  }, []);

  const signsToDisplay = useMemo(() => {
    return filteredSigns.slice(0, signToDisplayPerLoad * loadIteration);
  }, [filteredSigns, loadIteration, signToDisplayPerLoad]);

  useEffect(() => {
    const scrollParent = containerRef.current?.closest('.pageContainer');
    if (!scrollParent) return;

    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = scrollParent;
      const bottom = scrollHeight - (scrollTop + clientHeight) <= 2;
      if (bottom) setLoadIteration(prev => prev + 1);
    };

    scrollParent.addEventListener('scroll', handleScroll);
    return () => scrollParent.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="signList" ref={containerRef}>
      {signsToDisplay.map((sign, key) => (
        <SignItem key={key} signSimple={sign} />
      ))}
    </div>
  )
}

export default SignList
