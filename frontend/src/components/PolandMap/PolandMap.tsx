import { useMemo, useState } from "react";
import VoivodeshipsMap from "./VoivodeshipsMap";
import numData from './data.json';

export default function PolandMap() {
  const [region, setRegion] = useState<string | null>(null);

  // const visible = useMemo(
  //   () => (region ? items.filter((i) => i.terc === region) : items),
  //   [items, region]
  // );

  return (
    <VoivodeshipsMap numData={numData} selected={region} onSelect={setRegion} />
  );
}