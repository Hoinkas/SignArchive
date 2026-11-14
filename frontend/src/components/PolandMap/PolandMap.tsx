import type { IMapStats } from '@src/utils/calculateMapStatistics'
import MapItem from './MapItem/MapItem'
import "./PolandMap.css";

interface PolandMapProps {
  mapStats: IMapStats[]
  interactive?: boolean
  small?: boolean
}

const PolandMap = ({mapStats, interactive = false, small = false}: PolandMapProps) => {

    const className = [
        "mapWrapper",
        small ? " small" : ""
    ].join("")

    return (
        <div className={className}>
            <MapItem mapStats={mapStats} interactive={interactive}/>
        </div>
    )
}

export default PolandMap
